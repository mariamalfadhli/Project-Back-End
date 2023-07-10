const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  recImage: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingedient" }],
});

module.exports = model("Recipe", RecipeSchema);
