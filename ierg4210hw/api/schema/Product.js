const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    pid: mongoose.Schema.Types.ObjectId,
    cid: {type: mongoose.Schema.Types.ObjectId, ref: "Catagory"},
    name: String,
    price: Number,
    description: String,
    stock: Number,
    photos: [String],
})

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel