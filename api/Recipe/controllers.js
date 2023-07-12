const Recipe = require("../../db/models/Recipe");
const Category = require("../../db/models/Category");
exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe1 = await Recipe.findById(recipeId);

    return recipe1;
  } catch (error) {
    return next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    console.log("first");
    if (req.file) {
      req.body.recImage = req.file.path;
    }
    console.log(req.body);
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.find();
    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

exports.addCategoryToRecipe = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    if (!foundCategory)
      return next({ status: 404, message: "Category not found" });

    await req.recipe.updateOne({ $push: { categories: foundCategory._id } });
    await foundCategory.updateOne({ $push: { recipes: req.recipe._id } });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

// exports.deleteRecipe = async (req, res, next) => {
//   try {
//     if (!req.recipe.createdBy)
//       return next({ status: 401, message: "You can't delete this recipe" });
//     else await Recipe.findByIdAndRemove({ _id: req.recipe.id });
//     return res.status(204).end();
//   } catch (error) {
//     return next(error);
//   }
// };
