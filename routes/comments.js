const commentsRouter = require("express").Router();
const {
  changeCommentVote,
  deleteComment,
  allComments
} = require("../controllers/comments");

commentsRouter.route("/").get(allComments);

commentsRouter
  .route("/:comment_id")
  .put(changeCommentVote)
  .delete(deleteComment);

module.exports = commentsRouter;
