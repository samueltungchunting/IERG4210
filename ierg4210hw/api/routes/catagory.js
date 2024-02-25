const express = require('express');
const router = express.Router();
const ProductModel = require('../schema/Product');
const CatagoryModel = require('../schema/Catagory');


router.get('/get_catagories', async (req, res) => {
    const allProducts = await CatagoryModel.find({}).select('cid name');
    res.json(allProducts);
})


router.post('/add_catagory', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: "Invalid cid or name" });
    }
    const latestCatagory = await CatagoryModel.findOne().sort({ cid: -1 });
    const nextCid = isNaN(latestCatagory?.cid) ? 1 : latestCatagory.cid + 1;
    const addedCatagory = await CatagoryModel.create({
        cid: nextCid,
        name: name
    });
    res.json(addedCatagory);
})


module.exports = router;
