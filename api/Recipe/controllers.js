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

exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.find()
      .select("-__v")
      .populate("Recipe", "name");
    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    if (!req.recipe.createdBy)
      return next({ status: 401, message: "You can't update this recipe" });
    else await Recipe.findByIdAndUpdate(req.recipe.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    if (!req.recipe.createdBy)
      return next({ status: 401, message: "You can't delete this recipe" });
    else await Recipe.findByIdAndRemove({ _id: req.recipe.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
