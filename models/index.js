const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Comment,
  Post,
};
