const express = require("express");
const { getUser, createUser, fetchUser, signin } = require("./controllers");
const router = express.Router();
const passport = require("passport");

const upload = require("../../middlewares/uploader");
const {
  validateFields,
  validationRules,
} = require("../../middlewares/validateFields");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.foundUser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});
router.post(
  "/register",
  upload.single("image"),
  validationRules(),
  validateFields,
  createUser
);
router.post(
  "/signin",

  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
