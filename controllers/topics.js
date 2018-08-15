const { Topic, Article } = require("../models/");

const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      if (topics.length === 0) {
        throw { msg: "Error 404: No Topics Found", status: 404 };
      } else {
        res.send({ topics });
      }
    })
    .catch(err => {
      next(err);
    });
};

const getArticlesBySlug = (req, res, next) => {
  const topicSlug = req.params.topic_slug;
  Article.find({ belongs_to: topicSlug })
    .then(articles => {
      if (articles.length === 0) {
        throw { msg: "Error 404: No Articles Found", status: 404 };
      } else {
        res.send({ articles });
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getTopics, getArticlesBySlug };
