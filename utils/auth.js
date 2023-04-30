const withAuth = (req, res, next) => {
  if (!req.session.user_Id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
