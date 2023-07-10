const express = require("express");
const {
  getIngredients,
  createIngredient,
  fetchIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  try {
    const foundIngredient = await fetchIngredient(ingredientId);
    if (!foundIngredient)
      return next({ status: 404, message: "Ingredient not found" });
    req.ingredient = foundIngredient;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getIngredients);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createIngredient
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateIngredient
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteIngredient
);

module.exports = router;
