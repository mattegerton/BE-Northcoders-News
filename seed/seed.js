const mongoose = require("mongoose");
const { User, Article, Comment, Topic } = require("../models");
const { formatArticleData, formatCommentData } = require("../utils");

function seedDb({ articleData, commentData, topicData, userData }) {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        User.insertMany(userData),
        Topic.insertMany(topicData)
      ]);
    })
    .then(([userDocs, topicDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticleData(articleData, userDocs)),
        userDocs,
        topicDocs
      ]);
    })
    .then(([articleDocs, userDocs, topicDocs]) => {
      return Promise.all([
        Comment.insertMany(formatCommentData(commentData, userDocs, topicDocs)),
        articleDocs,
        userDocs,
        topicDocs
      ]);
    })
    .then(([commentDocs, articleDocs, userDocs, topicDocs]) => {
      console.log(commentDocs[0]);
      console.log(articleDocs[0]);
      console.log(userDocs[0]);
      console.log(topicDocs[0]);
    });
}

module.exports = seedDb;
