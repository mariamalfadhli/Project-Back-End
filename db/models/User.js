const { model, Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
    },
    recipe: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
