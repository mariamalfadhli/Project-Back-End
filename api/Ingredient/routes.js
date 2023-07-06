const express = require("express");
const {
  getIngredients,
  createIngredient,
  fetchIngredient,
} = require("./controllers");
const router = express.Router();

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
router.post("/", createIngredient);
