const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to DB");
  } catch (error) {
    console.log("connection to DB failed!", error);
  }
};

module.exports = connectDB;
