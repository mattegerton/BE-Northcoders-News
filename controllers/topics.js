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

const findArticlesBySlug = (req, res, next) => {
  const topicSlug = req.params.topic_slug;
  Article.find({ belongs_to: topicSlug })
    .then(articles => {
      if (articles.length === 0) {
        throw { msg: "Error 400: Invalid Request", status: 400 };
      } else {
        res.send({ articles });
      }
    })
    .catch(err => {
      next(err);
    });
};

const addNewArticle = (req, res, next) => {
  if (!req.body) throw { msg: "There was no article to post.", status: 400 };
  const article = {
    ...req.body,
    belongs_to: req.params.topic_slug
  };
  Article.create(article)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getTopics, findArticlesBySlug, addNewArticle };
