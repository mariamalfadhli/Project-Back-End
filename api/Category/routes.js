const express = require("express");
const { getCategory, createCategory, fetchCategory } = require("./controllers");
const router = express.Router();
const passport = require("passport");
router.param("categoryId", async (req, res, next, categoryId) => {
  try {
    const foundCategory = await fetchCategory(categoryId);
    if (!foundCategory)
      return next({ status: 404, message: "Category not found" });
    req.category = foundCategory;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getCategory);
router.post(
  "/",
  passport.authenticate("jwt", { session: fasle }),
  createCategory
);
