const { Article, Comment } = require("../models/");

const allArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(articles => {
      if (articles.length === 0) {
        throw { msg: "Error 404: No Topics Found", status: 404 };
      } else {
        const comments = articles.map(article => {
          return Comment.countDocuments({ belongs_to: article._id });
        });
        return Promise.all([articles, ...comments]);
      }
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

const articleById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .then(article => {
      if (!article) {
        throw { msg: "Error 404: No Topics Found", status: 404 };
      } else {
        res.send({ article });
      }
    })
    .catch(err => {
      next(err);
    });
};

const commentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id })
    .populate("created_by")
    .then(comments => {
      if (comments.length < 1) {
        throw { msg: "Error 404: No Comments Found", status: 404 };
      } else {
        res.send({ comments });
      }
    })
    .catch(err => {
      next(err);
    });
};

const addCommentToArticle = (req, res, next) => {
  const commentBody = {
    ...req.body,
    belongs_to: req.params.article_id
  };
  Comment.create(commentBody)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

const changeArticleVote = (req, res, next) => {
  if (req.query.vote === "up") {
    Article.findByIdAndUpdate(
      req.params.article_id,
      { $inc: { votes: 1 } },
      { new: true }
    ).then(article => {
      res.status(202).send({ article });
    });
  } else if (req.query.vote === "down") {
    Article.findByIdAndUpdate(
      req.params.article_id,
      { $inc: { votes: -1 } },
      { new: true }
    ).then(article => {
      res.status(202).send({ article });
    });
  } else {
    if (req.query !== "down" || req.query !== "up") {
      Article.findByIdAndUpdate(req.params.article_id)
        .then(article => {
          throw { msg: "Error 400: Bad Query", status: 400 };
        })
        .catch(err => {
          next(err);
        });
    }
  }
};

module.exports = {
  allArticles,
  articleById,
  commentsByArticleId,
  addCommentToArticle,
  changeArticleVote
};
