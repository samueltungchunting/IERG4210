// setup the server

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer")
const ProductModel = require('./schema/Product');
const CatagoryModel = require('./schema/Catagory');
const cors = require('cors');
const port = 3001;

