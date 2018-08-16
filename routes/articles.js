const articlesRouter = require("express").Router();
const {
  allArticles,
  articleById,
  commentsByArticleId,
  addCommentToArticle,
  changeArticleVote
} = require("../controllers/articles");

articlesRouter.route("/").get(allArticles);

articlesRouter
  .route("/:article_id")
  .get(articleById)
  .put(changeArticleVote);

articlesRouter
  .route("/:article_id/comments")
  .get(commentsByArticleId)
  .post(addCommentToArticle);

module.exports = articlesRouter;
