const router = require("express").Router();
const { Comment, User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/post", withAuth, async (req, res) => {
  try {
    let user = req.session.user_id;
    const postData = await Post.findAll({
      where: {
        user_id: user,
      },
      include :[Comment]
    });
    const post = postData.map((post) => post.get({ plain: true }));
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
      title: "post",
      active: { post: true },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      logged_in: true,
      title: "dashboard",
      active: { dashboard: true },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  console.log("here")
  const postData = await Post.findAll({
    include: [User, Comment],
  });
  let post = postData.map((post) => post.get({ plain: true }));
  console.log(post)
  res.render("homepage", {
    post,
    // logged_in: req.session.logged_in,
    // title: "homepage",
    // active: { homepage: true },
  });
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("onepost", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
