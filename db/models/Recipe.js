const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  recImage: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = model("Recipe", RecipeSchema);
