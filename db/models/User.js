const { model, Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: {
      type: String,
      default: "media/photo-1608848461950-0fe51dfc41cb.jpg",
    },
    recipe: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
