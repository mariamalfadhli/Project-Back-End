const Recipe = require("../../db/models/Recipe");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe1 = await Recipe.findById(recipeId)
      .select("-__v")
      .populate("category recipe ingredients", "name text");
    return recipe1;
  } catch (error) {
    return next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
