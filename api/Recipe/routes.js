const express = require("express");
const createRecipe = require("./controllers");
const router = express.Router();

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);

module.exports = router;
