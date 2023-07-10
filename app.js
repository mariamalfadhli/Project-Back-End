//imports
const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFoundPage");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const userRoutes = require("./api/User/routes");
const recipeRoutes = require("./api/Recipe/routes");
const ingredientRoutes = require("./api/Ingredient/routes");
const categoryRoutes = require("./api/Category/routes");
PORT = 8000;
require("dotenv").config();
//setup
const app = express();
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//middlwares before router

app.use(cors());
connectDB();
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/category", categoryRoutes);

//middlewares after router
app.use(notFound);
app.use(errorHandler);

//run server
app.listen(config.PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});

module.exports = app;
