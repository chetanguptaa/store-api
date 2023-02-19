const connectDB = require('./app');
const Product = require('./models/product');

const jsonProducts = require('./products.json');
const start = async () => {
  try {
    await connectDB('mongodb://admin:password@localhost:27017');
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
start();