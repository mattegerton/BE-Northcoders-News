exports.formatArticleData = (articleData, userDocs) => {
  return articleData.map(article => {
    const created_by = userDocs.find(
      user => user.username === article.created_by
    )._id;
    const belongs_to = article.topic;

    return {
      ...article,
      created_by,
      belongs_to
    };
  });
};

exports.formatCommentData = (commentData, userDocs, articleDocs) => {
  return commentData.map(comment => {
    const created_by = userDocs.find(
      user => user.username === comment.created_by
    )._id;

    const belongs_to = articleDocs.find(
      article => article.belongs_to === comment.title
    )._id;

    return {
      ...comment,
      created_by,
      belongs_to
    };
  });
};
