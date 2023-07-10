const Ingredient = require("../../db/models/Ingredient");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient1 = await Ingredient.findById(ingredientId);
    return ingredient1;
  } catch (error) {
    return next(error);
  }
};

exports.getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find()
      .select("-__v")
      .populate("Recipe", "name");
    return res.status(200).json(ingredients);
  } catch (error) {
    return next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    await Ingredient.findByIdAndUpdate(req.ingredient.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  try {
    await Ingredient.findByIdAndRemove({ _id: req.ingredient.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
