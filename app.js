require('dotenv').config();
require('express-async-errors');
const express= require('express');
const app = express();
const product = require('./models/product');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const connectDB  = require('./db/connect');
const router = require('./routes/data');


app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(notFound);

app.get('/', (req,res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', router);




const port = 3000;
const start = async () => {
  try {
    await connectDB('mongodb://store:storeapi@mongodb:27017')
    app.listen(port, () => console.log(`app is listening on port ${port}...`))
  } catch(error) {
    console.log(error);
  }
}

start();
