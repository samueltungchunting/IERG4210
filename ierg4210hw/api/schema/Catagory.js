const mongoose = require('mongoose')
const { Schema } = mongoose

const CatagorySchema = new Schema({
    cid: mongoose.Schema.Types.ObjectId,
    name: String,  
})

const CatagoryModel = mongoose.model("Catagory", CatagorySchema)
module.exports = CatagoryModel