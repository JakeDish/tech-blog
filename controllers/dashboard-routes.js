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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard-content", {
      layout: "dashboard",
      posts,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.redirect('login');
  }
});


router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("edit", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
}

)


module.exports = router;
