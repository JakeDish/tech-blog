const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_Id: req.session.user_Id,
      },
    });

    const posts = postData.map((post) => postData.get({ plain: true }));

    res.render("dashboard", {
      layout: "dashboard",
      posts,
      
    });
  } catch (err) {
    console.log(err);
    res.redirect('login');
  }
});


module.exports = router;
