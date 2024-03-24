const express = require('express');
const router = express.Router();
const multer = require("multer");
const ProductModel = require('../schema/Product');
const CatagoryModel = require('../schema/Catagory');
const { uploadFileToS3, getFileFromS3, deleteFileFromS3 } = require('./s3');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');


function randomImageName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex')
}

router.get('/get_all_products', async (req, res) => {
    const allProducts = await ProductModel.find({});
    for (let product of allProducts) {
        if (product.photos.length === 0) {
            continue;
        }
        const firstPhoto = (product.photos)[0];
        await getFileFromS3(firstPhoto).then((url) => {
            product.photos[0] = url;
        })
    }
    res.json(allProducts);
})


router.get('/get_all_products/:cid', async (req, res) => {
    const { cid } = req.params;
    const productByCid = await ProductModel.find({ cid: parseInt(cid) });

    for (let product of productByCid) {
        if (product.photos.length === 0) {
            continue;
        }
        const firstPhoto = (product.photos)[0];
        await getFileFromS3(firstPhoto).then((url) => {
            product.photos[0] = url;
        })
    }

    return res.json(productByCid);
})


router.get('/get_product/:pid', async (req, res) => {
    const { pid } = req.params;
    if (!pid) {
        return res.status(400).json({ msg: "Invalid pid" });
    }
    const product = await ProductModel.findOne({ pid: parseInt(pid) });
    if (product.photos.length === 0) {
        return res.json(product);
    }
    const firstPhoto = (product.photos)[0];
    await getFileFromS3(firstPhoto).then((url) => {
        product.photos[0] = url;
    })
    return res.json(product);
})

// const photosClickUploadMiddleware = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/add_product', upload.single('photo'), async (req, res) => {
    try {
        const { category, name, price, description, stock } = req.body;
        // if (!_csrfToken || _csrfToken !== req.csrfToken()) {
        //   throw new Error('Invalid CSRF token');
        // }
    
        const categoryId = await CategoryModel.findOne({ name: category }).select('_id');
        const latestProduct = await ProductModel.findOne().sort({ pid: -1 }).select('pid');
        const nextPid = latestProduct ? latestProduct.pid + 1 : 1;
    
        const addedProduct = await ProductModel.create({
          pid: nextPid,
          cid: categoryId,
          name,
          price,
          description,
          stock,
          photos: randomImageName(),
        });
    
        await uploadFileToS3(req.file, addedProduct.photos);
        res.json({ message: 'Product added successfully' });
      } catch (error) {
        res.status(403).json({ error: error.message });
      }
});


router.delete('/delete_product/:pid', async (req, res) => {
    const { pid } = req.params;
    if (isNaN(pid) || !pid) {
        return res.status(400).json({ msg: "Invalid pid" });
    }
    const targetProduct = await ProductModel.findOne({ pid: parseInt(pid) });
    if(!targetProduct) {
        return res.status(400).json({ msg: "Invalid pid" });
    }
    const fileName = targetProduct.photos[0]
    await ProductModel.deleteOne({ pid: parseInt(pid) });
    await deleteFileFromS3(fileName)
    res.json({msg: "Product deleted"});
})

router.get('/get_product_detail_from_localstorage/:productId', async (req, res) => {
    const { productId } = req.params;
    const product = await ProductModel.findOne({pid: productId});

    const firstPhoto = product.photos[0];
    await getFileFromS3(firstPhoto).then((url) => {
        product.photos[0] = url;
    })

    res.json(product);
})


module.exports = router;