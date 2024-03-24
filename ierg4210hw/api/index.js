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
const path = require('path');
const session = require('express-session');

// middleware / routes
const cors = require('cors');
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // You can configure cookie options here
}));
const productRoutes = require('./routes/product');
const catagoryRoutes = require('./routes/catagory');
const authRoutes = require('./routes/auth');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfProtection);


const DevMode = process.env.DEV_MODE
app.use(cors({
    // origin: DevMode === "DEV" ? ['http://localhost:3000'] : ['http://52.64.102.124', 'https://s15.ierg4210.ie.cuhk.edu.hk', 'https://secure.s15.ierg4210.ie.cuhk.edu.hk'],
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true
}));

mongoose.connect(process.env.MONGO_URL)

// APIs
app.use('/product', productRoutes);
app.use('/catagory', catagoryRoutes);
app.use('/auth', authRoutes);



// API routes here
app.get('/helloindex', async (req, res) => {
    res.json({msg: "Hello from index.js"});
})

app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the request for the text file
app.get('/.well-known/pki-validation/AF6264F6298A321FED6DA700698A6355.txt', (req, res) => {
  // Set the content type as plain text
  res.set('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'public', 'AF6264F6298A321FED6DA700698A6355.txt'));
});


app.listen(PORT);