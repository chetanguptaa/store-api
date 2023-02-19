require('dotenv').config();
require('express-async-errors');
const express= require('express');
const app = express();
const mongoose = require('mongoose');
const product = require('./models/product');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

app.use(express.json());

app.get('/', (req,res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});


app.get('/', async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if ( featured) {
    queryObject.featured = featured === 'true' ? true: false;
  }
  if ( company) {
    queryObject.company = company;
  }
  if ( name ) {
    queryObject.name = { $regex: name, $options: 'i'};
  }
  if ( numericFilters ) {
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx,
        (match) => `-${operatorMap[match]}-`);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
});


app.get('/static', async (req, res) => {
  const products = await Product.find({price: {$gt: 30}})
    .sort('price')
    .select('name price');
  res.status(200).json( { products, nbHits: products.length});
})



const port = 3000;
const start = async () => {
  try {
    await connectDB('mongodb://admin:password@localhost:27017')
    app.listen(port, () => console.log(`app is listening on port ${port}...`))
  } catch(error) {
    console.log(error);
  }
}

start();
