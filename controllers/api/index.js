const router = require("express").Router();
const postRoutes = require("./postRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/signup", signUpRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
