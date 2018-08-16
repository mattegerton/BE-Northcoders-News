const topicsRouter = require("express").Router();
const {
  getTopics,
  findArticlesBySlug,
  addNewArticle
} = require("../controllers/topics");

topicsRouter.route("/").get(getTopics);

topicsRouter
  .route("/:topic_slug/articles")
  .get(findArticlesBySlug)
  .post(addNewArticle);

module.exports = topicsRouter;
