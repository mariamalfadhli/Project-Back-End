const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  userImage: String,
  categories: [{}],
  ingredients: [{}],
});

module.exports = model("Recipe", RecipeSchema);
