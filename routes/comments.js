const commentsRouter = require("express").Router();
const { changeCommentVote } = require("../controllers/comments");

commentsRouter.route("/:comment_id").put(changeCommentVote);

module.exports = commentsRouter;
