const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.MONGODB_URI+process.env.MONGODB_COLLECTION);

const connectToMongoDB = () => {
   try {
      mongoose.connect(process.env.MONGODB_URI+process.env.MONGODB_COLLECTION, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit the process if unable to connect
   }
};

module.exports = { connectToMongoDB }