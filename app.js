require('dotenv').config();
require('express-async-errors');
const express= require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const connectDB  = require('./db/connect');
const productsRouter = require('./routes/data');


app.use(express.json());



app.get('/', (req,res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});


app.use('/api/v1/products',productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




const port = 3000;
const start = async () => {
  try {
    // await connectDB('mongodb://admin:password@mongodb:27017')
    await connectDB('mongodb://mongouser:mongopassword@mongo-service:27017')
    app.listen(port, () => console.log(`app is listening on port ${port}...`))
  } catch(error) {
    console.log(error);
  }
}

start();
