const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csvtojson");
const Store=require("../models/Stores")
const path = require('path');
const { createClient } = require('redis');
const fs = require('fs').promises;
const Joi = require('joi');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const REDIS_PORT = 6380;

const client = createClient({
  socket: {
    port: REDIS_PORT,
  }
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Could not connect to Redis', err);
});

const upload = multer({
    storage,
});

const config = {
  states: {
    filePath: path.join('../server/geojsons/india-states.json')
  },
  districts: {
    filePath: path.join('../server/geojsons/india_district.json')
  }
};

async function fetchLocalJsonData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching local JSON data:', error);
    throw error;
  }
}

async function getGeoJson(type, req, res, next) {
  try {
    console.log(`Fetching ${type} data...`);
    const filePath = config[type].filePath;
    const data = await fetchLocalJsonData(filePath);
    await client.setEx(`India${type.charAt(0).toUpperCase() + type.slice(1)}`, 3600, JSON.stringify(data));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function cache(type, req, res, next) {
  try {
    const data = await client.get(`India${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if (data !== null) {
      res.json(JSON.parse(data));
      console.log(`${type} data found in cache`);
    } else {
      next();
    }
  } catch (err) {
    console.error('Redis GET Error', err);
    res.status(500).send('Server Error');
  }
}
router.get('/geojson/IndiaStates', (req, res, next) => cache('states', req, res, next), (req, res, next) => getGeoJson('states', req, res, next));
router.get('/geojson/IndiaDistricts', (req, res, next) => cache('districts', req, res, next), (req, res, next) => getGeoJson('districts', req, res, next));

router.get('/getRedStores/:Audit', async (req, res) => {
  try {
    const Audit = req.params.Audit;
    
    const redStore = await Store.aggregate([
      {
        $match: {
          [Audit]: "RED" 
        }
      },
      {
        $group: {
          _id: "$STATE",
          count: {
            $sum: 1
          }
        }
      }
    ]);

    res.json(redStore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
async function cache1(req, res, next) {
  try {
    const State = req.params.State;
    const Format = req.params.Format;
    const Audit = req.params.Audit;
    const Subformat = req.params.Subformat;
    const data = await client.get(`${State}${Format}${Audit}${Subformat}`);
    if (data !== null) {
      console.log(`${State} ${Format} ${Audit} ${Subformat} data found in cache`)
      res.json(JSON.parse(data));
    } else {
      next(); 
    }
  } catch (err) {
    console.error('Redis GET Error', err);
    res.status(500).json({ error: 'Server Error' }); 
  }
}

router.get('/getStores/:State/:Format/:Audit/:Subformat', cache1, async (req, res) => {
  try {
    const State = req.params.State;
    const Format = req.params.Format;
    const Audit = req.params.Audit;
    const Subformat = req.params.Subformat;
    let ans;
    const matchStage = [{ $match: { "STATE": State } }];
    if(Format!=="All Stores" && Subformat!=="All Subformats"){
      matchStage.push({ $match: { "FORMAT": Format, "SUBFORMAT": Subformat } });
    }else if (Format !== "All Stores" && Subformat==="All Subformats") {
      matchStage.push({ $match: { "FORMAT": Format } });
    }else if(Format==="All Stores" && Subformat!=="All Subformats"){
      matchStage.push({ $match: {"SUBFORMAT": Subformat } });
    }

    const projectStage = { $project: { STORE_CODE: 1 ,LATITUDE:1,LONGITUDE:1,STORE_SITENAME:1,Auditor:1,MOPR_Rating:1} };
    projectStage.$project["RAG"] = `$${Audit}`;
    ans = await Store.aggregate([
      ...matchStage,
      projectStage
    ]);

    await client.setEx(`${State}${Format}${Audit}${Subformat}`, 3600, JSON.stringify(ans));
    res.json(ans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


router.get("getPanIndiaStores/:Zone/:Format/:Audit/:Subformat", async (req, res) => {
  try{
     const Zone=req.params.Zone
     const Format=req.params.Format
     const Subformat=req.params.Subformat
     const Audit=req.params.Audit
     let ans;
     if(Zone==="All"){
        const matchStage=[]
        if(Format!=="All Stores" && Subformat!=="All Subformats"){
          matchStage.push({ $match: { "FORMAT": Format, "SUBFORMAT": Subformat } });
        }else if (Format !== "All Stores" && Subformat==="All Subformats") {
          matchStage.push({ $match: { "FORMAT": Format } });
        }else if(Format==="All Stores" && Subformat!=="All Subformats"){
          matchStage.push({ $match: {"SUBFORMAT": Subformat } });
        }
     }else{
        const matchStage = [{ $match: { "ZONE": Zone } }];
        if(Format!=="All Stores" && Subformat!=="All Subformats"){
          matchStage.push({ $match: { "FORMAT": Format, "SUBFORMAT": Subformat } });
        }else if (Format !== "All Stores" && Subformat==="All Subformats") {
          matchStage.push({ $match: { "FORMAT": Format } });
        }else if(Format==="All Stores" && Subformat!=="All Subformats"){
          matchStage.push({ $match: {"SUBFORMAT": Subformat } });
        }
     }
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
})

router.get("/getZones",async(req, res) => {
  try{
    const Zones=await Store.aggregate([
      {
        $group: {
          _id: "$ZONE",
          states: {
            $addToSet: "$STATE"
          }
        }
      }
    ])
    res.json(Zones)
  }catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
})

const storeSchema = Joi.object({
  STORE_CODE: Joi.string().alphanum().length(4).required(),
  ZONE: Joi.string().required().valid("North","South","West","East"),
  STATE: Joi.string().required().valid("MPCG","Rajasthan","WB + Sikkim","Uttar Pradesh","NCR + HR","Punjab","Gujarat","Odisha","Kerala","MH + Goa","HP + JK + UK","Telangana","AsNE","Karnataka","Bihar","Jharkhand","Tamil Nadu","Andhra Pradesh"),
  FORMAT: Joi.string().required().valid("Electronics","Grocery","Other Format","F&L"),
  SUBFORMAT: Joi.string().required(),
  STORE_SITENAME: Joi.string().required(),
  Auditor: Joi.string().optional().allow('','0'),
  MOPR_Rating: Joi.any().optional(),
});

router.post("/uploadEmp", upload.single("csvFile"), async (req, res) => {
  try {
      const jsonArray = await csv().fromFile(req.file.path);
      jsonArray.forEach(store => {
          store["MOPR Rating"] = store["MOPR Rating"] === '' ? null : parseFloat(store["MOPR Rating"]);
          store["LATITUDE"] = parseFloat(store["LATITUDE"]);
          store["LONGITUDE"] = parseFloat(store["LONGITUDE"]);
      });

      for (const store of jsonArray) {
          const { error } = storeSchema.validate({
              STORE_CODE: store["Site Code"],
              ZONE: store["Zone"],
              STATE: store["SH"],
              FORMAT: store["Format"],
              SUBFORMAT: store["Sub Format"],
              STORE_SITENAME: store["Site Name"],
              Auditor: store["Auditor"],
              MOPR_Rating: store["MOPR Rating"],
              
          });
          if (error) {
              return res.status(400).json({ error: error.details[0].message });
          }
      }

      const operations = jsonArray.map(store => ({
          updateOne: {
              filter: { STORE_CODE: store["Site Code"] },
              update: {
                  $set: {
                      LATITUDE: store["LATITUDE"],
                      LONGITUDE: store["LONGITUDE"],
                      ZONE: store["Zone"],
                      STATE: store["SH"],
                      FORMAT: store["Format"],
                      SUBFORMAT: store["Sub Format"],
                      STORE_SITENAME: store["Site Name"],
                      Auditor: store["Auditor"],
                      MOPR_Rating: store["MOPR Rating"],
                      RAG: store["RAG"],
                      InventoryHygieneScore: store["Inventory Hygiene Score"],
                      ShrinkYTD: store["Shrink YTD"],
                      DryDump: store["Dry Dump"],
                      WetDump: store["Wet Dump"],
                      StockCorrections: store["Stock corrections (2997)"],
                      ZeroSales: store["Zero sales of last 90 days"],
                      DOH: store["DOH"],
                      Refund: store["Refund %"],
                      MDSales: store["MD sales"],
                      DuplicateBill: store["Duplicate Bill"],
                      HighValueTransactions: store["High Value Transactions"]
                  }
              },
              upsert: true
          }
      }));
      await Store.bulkWrite(operations);
      console.log("Data inserted/updated successfully");
      return res.json({ msg: "Data inserted/updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;