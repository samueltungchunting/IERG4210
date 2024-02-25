const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer")
const ProductModel = require('./schema/Product');
const CatagoryModel = require('./schema/Catagory');
const fs = require("fs")
const PORT = 4000;
require('dotenv').config();

const cors = require('cors');
const productRoutes = require('./routes/product');
const catagoryRoutes = require('./routes/catagory');

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    // origin: 'http://127.0.0.1:5173',
    credentials: true    
}));

mongoose.connect(process.env.MONGO_URL)


// APIs
app.use('/product', productRoutes);
app.use('/catagory', catagoryRoutes);

app.get('/helloindex', async (req, res) => {
    // const addedCatagory = await CatagoryModel.create({
    //     cid: 386,
    //     name: "Snacks"
    // });
    // res.json(addedCatagory);
    res.json({msg: "Hello from index.js"});
})

app.listen(PORT);