const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(mongoose.connection.readyState);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
