const Category = require("../../db/models/Category");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category1 = await Category.findById(categoryId);
    return category1;
  } catch (error) {
    return next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// exports.updateCategory = async (req, res, next) => {
//   try {
//     await Category.findByIdAndUpdate(req.category.id, req.body);
//     return res.status(204).end();
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.deleteCategory = async (req, res, next) => {
//   try {
//     await Category.findByIdAndRemove({ _id: req.category.id });
//     return res.status(204).end();
//   } catch (error) {
//     return next(error);
//   }
// };
