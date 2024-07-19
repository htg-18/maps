const mongoose = require('mongoose');
const {Schema} = mongoose;

const StoreSchema = mongoose.Schema({
    STORE_CODE:{
        required: true,
        type:String,
        unique: true,
    },
    LATITUDE:{
        required: true,
        type: Number,
        default: 0,
        set: v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v)),
    },
    LONGITUDE:{
        required: true,
        type: Number,
        default: 0,
        set: v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v)),
    },
    ZONE:{
        required: true,
        type:String
    },
    STATE:{
        required: true,
        type:String
    },
    FORMAT:{
        required: true,
        type:String
    },
    SUBFORMAT:{
        required: true,
        type:String
    },
    STORE_SITENAME:{
        required: true,
        type:String
    },
    Auditor:{
        type:String
    },
    MOPR_Rating:{
        default:0,
        set:v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v)),
        type:Number
    },
    RAG:{
       type:String,
       default:'Black',
       set: v => (v === '' ||v=="0"||v=='NA' ? 'Black' : v), 
       enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    // MOPR_Status:{
    //    required: true,
    //    type:String,
    //    enum: ['Done', 'Not Done'],
    // },
    InventoryHygieneScore:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    ShrinkYTD:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    DryDump:{
        type:String,
        default:'Black',
        set: v => (v === '' ||v=='NA'? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    WetDump:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    StockCorrections:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    ZeroSales:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    DOH:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    Refund:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    MDSales:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    DuplicateBill:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    },
    HighValueTransactions:{
        type:String,
        default:'Black',
        set: v => (v === ''||v=='NA' ? 'Black' : v), 
        enum: ['RED', 'AMBER', 'GREEN','Black'],
    }
})

const Store = mongoose.model('store',StoreSchema);
module.exports = Store;