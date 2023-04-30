const router = require("express").Router();
const { Comment, User, Post } = require("../models");
const withAuth = require("../utils/auth");
const format_date = require('../utils/helpers');

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
      // where: {
      //   user_id: user,
      // },
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

// router.get("/dashboard", withAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Post,
//       required:true }],
//     });

//     const user = userData.get({ plain: true });
//     res.render("dashboard", {
//       ...user,
//       logged_in: true,
//       title: "dashboard",
//       active: { dashboard: true },
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try{
  const postData = await Post.findAll({
    include: [
      {
        model: Comment,
        required: true,
      },
      {
        model: User,
        required: true,
      },
    ],
  });

  const posts = postData.map((post) => post.get({ plain: true }));

  res.render("homepage", {
    posts,
    // logged_in: req.session.logged_in,
    // title: "homepage",
    // active: { homepage: true },
  });
} catch (err) {
  res.status(500).json(err)
}
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          required: true,
        },
        {
          model: User,
          required: true
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("singlepost", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
