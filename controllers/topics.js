const { Topic } = require("../models/");

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

module.exports = { getTopics };
