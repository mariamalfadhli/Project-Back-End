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
    const categories = await Category.find()
      .select("-__v")
      .populate("Cuisine", "name");
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name == "maryam") {
      res.json({ msg: "you cant create a maryam category" });
    }

    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
