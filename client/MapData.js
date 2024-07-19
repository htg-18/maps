const stateColors = {
    "Jammu and Kashmir": "orange", "Andhra Pradesh": '#FCDC10', "Arunachal Pradesh": '#ff7f0e', "Assam": '#2ca02c', "Bihar": '#d62728', "Chhattisgarh": '#9467bd', "Goa": '#8c564b',
    "Gujarat": '#e377c2', "Haryana": '#F7418F', "Himachal Pradesh": '#bcbd22', "Jharkhand": '#17becf', "Karnataka": '#615EFC', "Kerala": '#b5cf6b',
    "Madhya Pradesh": '#4CCD99', "Maharashtra": '#5BBCFF', "Manipur": '#5A72A0', "Meghalaya": '#ce6dbd', "Mizoram": '#512B81', "Nagaland": '#e7ba52', "Orissa": '#FF7D29', "Punjab": '#ad494a',
    "Rajasthan": '#FFC700', "Sikkim": '#31a354', "Tamil Nadu": '#7b4173', "Telangana": '#973131', "Tripura": '#AF47D2', "Uttar Pradesh": '#5AB2FF', "Uttaranchal": '#543310',
    "West Bengal": '#7776B3', "Andaman and Nicobar Islands": '#8c6d31', "Chandigarh": '#9c9ede', "Dadra and Nagar Haveli": '#7375b5', "Daman and Diu": '#637939', "Delhi": '#393b79', "Lakshadweep": '#7b4173', "Puducherry": '#5254a3'
  };

  const coordinates = {
    "AP": { lat: 16.506174, lng: 80.648015 }, 
    "NE": { lat: 26.200604, lng: 92.937574 }, 
    "MH_GO": { lat: 18.520430, lng: 73.856744 }, 
    "MP_CG": { lat: 23.259933, lng: 77.412615 }, 
    "HR_DL": { lat: 28.704060, lng: 77.102493 }, 
    "JK_HP_UK": { lat: 34.083656, lng: 74.797371 }, 
    "RJ": { lat: 26.912434, lng: 75.787271 }, 
    "UP": { lat: 26.846708, lng: 80.946159 }, 
    "BR": { lat: 25.594095, lng: 85.137566 }, 
    "WB": { lat: 22.572646, lng: 88.363895 }, 
    "OR": { lat: 20.296059, lng: 85.824539 }, 
    "KA": { lat: 12.971599, lng: 77.594566 }, 
    "KL": { lat: 10.850516, lng: 76.271083 }, 
    "TN": { lat: 13.082680, lng: 80.270718 }, 
    "PB": { lat: 30.733315, lng: 76.779419 }, 
    "JH": { lat: 23.610180, lng: 85.279935 }, 
    "TG": { lat: 17.385044, lng: 78.486671 }, 
    "GJ": { lat: 23.022505, lng: 72.571362 }, 
  };
  
  const stateCoordinates = [
    { states: ["Andhra Pradesh"], coordKey: "AP" },
    { states: ["Assam", "Manipur", "Tripura", "Nagaland", "Mizoram", "Arunachal Pradesh", "Meghalaya"], coordKey: "NE" },
    { states: ["Maharashtra", "Goa"], coordKey: "MH_GO" },
    { states: ["Madhya Pradesh", "Chhattisgarh"], coordKey: "MP_CG" },
    { states: ["Haryana", "Delhi"], coordKey: "HR_DL" },
    { states: ["Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand"], coordKey: "JK_HP_UK" },
    { states: ["Rajasthan"], coordKey: "RJ" },
    { states: ["Uttar Pradesh"], coordKey: "UP" },
    { states: ["Bihar"], coordKey: "BR" },
    { states: ["Sikkim","West Bengal"], coordKey: "WB" },
    { states: ["Orissa"], coordKey: "OR" },
    { states: ["Karnataka"], coordKey: "KA" },
    { states: ["Kerala"], coordKey: "KL" },
    { states: ["Tamil Nadu"], coordKey: "TN" },
    { states: ["Punjab"], coordKey: "PB" },
    { states: ["Gujarat"], coordKey: "GJ" },
    { states: ["Andaman and Nicobar Islands"], coordKey: "AN" },
    { states: ["Chandigarh"], coordKey: "CH" },
    { states: ["Dadra and Nagar Haveli and Daman and Diu"], coordKey: "DN" },
    { states: ["Lakshadweep"], coordKey: "LD" },
    { states: ["Puducherry"], coordKey: "PY" },
    { states: ["Jharkhand"], coordKey: "JH" },
    { states: ["Telangana"], coordKey: "TG" },
  ];

  const formats=["All Stores","Electronics","F&L","Grocery","Other Format"]
  const zones=["All","North","South","East","West"]
  const subFormats = [
    "All Subformats","Milk Basket Hub","Digital","Smart Bazaar","SMART","SMART Net","Digital in SB","CENTRO","FASHION FACTORY",
    "SWADESH","TRENDS","SB","AZORTE","YOUSTA","BEAUTY","FOOTPRINT","BISMI","Signature","Smart Point","FreshPik",
    "GAP","TST","KALANIKETAN","AVANTRA","TRENDS EXTENSION","COVER STORY","AUTOZONE","7 ELEVEN","JOHN PLAYER",
    "LEE COOPER","Bismi Hypermarket (SP)","PORTICO","AMANTE","SIS FOOTPRINT","Fresh","Digital Stores","FASHION WORLD",
    "CAT WALK","BLUSHLACE","DIGITAL DC","Dry DC","TRENDS DC","PL DC","CPC","REGALIA DC","AJIO DC","KALANIKETAN DC",
    "AJIO B2B DC","GAP DC","BISMI DC","Footprint DC","COVER STORY DC","CENTRO DC","BRANDS OUT DC","PORTICO DC",
    "SWADESH DC","7 ELEVEN DC","FC","AZORTE DC","Market Place","QALARA DC"
  ];
  

  const audits = [
    "Inventory Hygiene Score",
    "Shrink YTD",
    "Dry Dump",
    "Wet Dump",
    "Stock corrections (2997)",
    "Zero sales of last 90 days",
    "DOH",
    "Refund %",
    "MD sales",
    "Duplicate Bill",
    "High Value Transactions",
    "MOPR"
  ];

  const statesInDB=[
    { states: ["Andhra Pradesh"], coordKey: "Andhra Pradesh" },
    { states: ["Assam", "Manipur", "Tripura", "Nagaland", "Mizoram", "Arunachal Pradesh", "Meghalaya"], coordKey: "AsNE" },
    { states: ["Maharashtra", "Goa"], coordKey: "MH + Goa" },
    { states: ["Madhya Pradesh", "Chhattisgarh"], coordKey: "MPCG" },
    { states: ["Haryana", "Delhi"], coordKey: "NCR + HR" },
    { states: ["Jammu and Kashmir", "Himachal Pradesh", "Uttaranchal"], coordKey: "HP + JK + UK" },
    { states: ["Rajasthan"], coordKey: "Rajasthan" },
    { states: ["Uttar Pradesh"], coordKey: "Uttar Pradesh" },
    { states: ["Bihar"], coordKey: "Bihar" },
    { states: ["Sikkim","West Bengal"], coordKey: "WB + Sikkim" },
    { states: ["Orissa"], coordKey: "Odisha" },
    { states: ["Karnataka"], coordKey: "Karnataka" },
    { states: ["Kerala"], coordKey: "Kerala" },
    { states: ["Tamil Nadu"], coordKey: "Tamil Nadu" },
    { states: ["Punjab"], coordKey: "Punjab" },
    { states: ["Gujarat"], coordKey: "Gujarat" },
    { states: ["Jharkhand"], coordKey: "Jharkhand" },
    { states: ["Telangana"], coordKey: "Telangana" },
  ]

  const AuditsInDB={
    "DOH":"DOH",
    "Inventory Hygiene Score":"InventoryHygieneScore",
    "Shrink YTD":"ShrinkYTD",
    "Dry Dump":"DryDump",
    "Wet Dump":"WetDump",
    "Stock corrections (2997)":"StockCorrections",
    "Zero sales of last 90 days":"ZeroSales",
    "DOH":"DOH",
    "Refund %":"Refund",
    "MD sales":"MDSales",
    "Duplicate Bill":"DuplicateBill",
    "High Value Transactions":"HighValueTransactions",
    "MOPR":"RAG"
  }
export {stateColors,stateCoordinates,coordinates,statesInDB,formats,zones,subFormats,audits,AuditsInDB} 