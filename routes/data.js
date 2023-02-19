const express = require('express');
const router  = express.Router();
const {getProducts, getProductsStatic} = require('../controllers/data');

router.route('/').get(getProducts);
router.route('/static').get(getProductsStatic);

module.exports= router;


