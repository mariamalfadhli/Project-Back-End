//imports
const express = require("express");
const connectDB = require("./database");

require("dotenv").config();
//setup
const app = express();

//middlwares before router
app.use(express.json());

//routes

//middlewares after rout  er

//run server
connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
