const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  recImage: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  categories: [{}],
  ingredients: [{}],
});

module.exports = model("Recipe", RecipeSchema);
