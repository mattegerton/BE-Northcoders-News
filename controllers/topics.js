const { Topic, Article, Comment } = require("../models/");

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
    .lean()
    .then(articles => {
      if (articles.length === 0) {
        throw { msg: "Error 400: Invalid Request", status: 400 };
      }
      const comments = articles.map(article => {
        return Comment.countDocuments({ belongs_to: article._id });
      });

      return Promise.all([articles, ...comments]);
    })
    .then(([articles, ...comments]) => {
      articles = articles.map((article, i) => {
        return {
          ...article,
          comment_count: comments[i]
        };
      });
      res.status(200).send({ articles });
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
