//imports
const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

require("dotenv").config();
//setup
const app = express();
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//middlwares before router

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));
//routes

//middlewares after rout  er
app.use(notFound);
app.use(errorHandler);

//run server
connectDB();
app.listen(config.PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});

module.exports = app;
