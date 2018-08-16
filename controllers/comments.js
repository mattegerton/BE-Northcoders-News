const { Comment } = require("../models");

const changeCommentVote = (req, res, next) => {
  if (req.query.vote === "up") {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      { $inc: { votes: 1 } },
      { new: true }
    ).then(comment => {
      res.status(202).send({ comment });
    });
  } else if (req.query.vote === "down") {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      { $inc: { votes: -1 } },
      { new: true }
    ).then(comment => {
      res.status(202).send({ comment });
    });
  } else {
    if (req.query !== "down" || req.query !== "up") {
      Comment.findByIdAndUpdate(req.params.comment_id)
        .then(comment => {
          throw { msg: "Error 400: Bad Query", status: 400 };
        })
        .catch(err => {
          next(err);
        });
    }
  }
};

module.exports = { changeCommentVote };
