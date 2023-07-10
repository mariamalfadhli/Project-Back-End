const express = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  fetchRecipe,
} = require("./controllers");
const router = express.Router();

const passport = require("passport");
const upload = require("../../middlewares/uploader");

router.param("recipeId", async (req, res, next, recipeId) => {
  try {
    const foundRecipe = await fetchRecipe(recipeId);
    if (!foundRecipe) return next({ status: 404, message: "Recipe not found" });
    req.recipe = foundRecipe;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getRecipe);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("categImage"),
  createRecipe
);

router.put("/", passport.authenticate("jwt", { session: false }), updateRecipe);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
module.exports = router;
