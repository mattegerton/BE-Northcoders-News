process.env.NODE_ENV = "test";
const app = require("../app");
const seedDB = require("../seed/seed");
const data = require("../seed/testData/");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");

describe("Northcoders News Testing...", () => {
  let commentDocs,
    articleDocs,
    topicDocs,
    userDocs,
    wrongID = mongoose.Types.ObjectId();
  beforeEach(function() {
    this.timeout(3000);
    return seedDB(data)
      .then(docs => {
        [commentDocs, articleDocs, topicDocs, userDocs] = docs;
        console.log("seeding testData");
      })
      .catch(err => {
        console.log(err);
      });
  });
  after(() => {
    mongoose.disconnect();
  });

  // API (generic tests //
  describe("/api", () => {
    it("GET responds with 404 for an invalid route.", () => {
      return request
        .get("/abc")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("GET responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .get("/abc/123")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("DELETE responds with 404 for an invalid route.", () => {
      return request
        .delete("/abc")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("DELETE responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .delete("/abc/123")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("PUT responds with 404 for an invalid route.", () => {
      return request
        .put("/abc")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("PUT responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .put("/abc/123")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("POST responds with 404 for an invalid route.", () => {
      return request
        .post("/abc")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
    it("POST responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .post("/abc/123")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
  });

  // Topics (All topics) //

  describe("/api/topics", () => {
    it("GET responds with 200 with topic list.", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[0].title).to.equal("Mitch");
        });
    });
    it("DELETE responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .delete("/api/topics")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
  });

  // Topics (Articles by slug) //

  describe("/api/topics/:topic_slug/articles", () => {
    it("GET responds with 200 with topic list.", () => {
      return request
        .get("/api/topics/mitch/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[0].body).to.equal(
            "I find this existence challenging"
          );
        });
    });
    it("GET responds with 400 for a bad request", () => {
      return request
        .get("/api/topics/1/articles")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Error 400: Invalid Request");
        });
    });
    it("POST responds with 201 and new article", () => {
      const newArticle = {
        title: "new article",
        body: "this is my new article content",
        created_by: "5b740b676ae2b0703855c140"
      };
      return request
        .post("/api/topics/football/articles")
        .send(newArticle)
        .expect(201)
        .then(res => {
          expect(res.body.article).to.have.all.keys(
            "votes",
            "_id",
            "title",
            "body",
            "created_by",
            "belongs_to",
            "created_at",
            "__v"
          );
          expect(res.body.article.title).to.equal("new article");
        });
    });
    it("POST responds with 400 and error message", () => {
      const newArticle = {
        title: "new article",
        //body: should be required for Schema.
        created_by: "5b740b676ae2b0703855c140"
      };
      return request
        .post("/api/topics/football/articles")
        .send(newArticle)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            "articles validation failed: body: Path `body` is required."
          );
        });
    });
  });

  // Articles (All) //

  describe("/api/articles", () => {
    it("GET responds with 200 and all articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0]).to.have.keys(
            "_id",
            "votes",
            "title",
            "created_by",
            "body",
            "comment_count",
            "created_at",
            "belongs_to",
            "__v"
          );
        });
    });
    it("DELETE responds with 404 and all articles", () => {
      return request
        .delete("/api/articles")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
  });

  // Articles (By Id, Vote) //

  describe("/api/articles/:article_id", () => {
    it("GET responds with 200 and all articles", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.belongs_to).to.equal("mitch");
          expect(res.body.article).to.have.keys(
            "votes",
            "_id",
            "title",
            "created_by",
            "body",
            "created_at",
            "belongs_to",
            "__v"
          );
        });
    });
    it("GET responds with 400 and err message", () => {
      return request
        .get("/api/articles/nothing")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "nothing" at path "_id" for model "articles"'
          );
        });
    });
    it("GET responds with 404 and err message", () => {
      return request
        .get(`/api/articles/${wrongID}`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Error 404: No Topics Found");
        });
    });
    it("PUT (query up) responds with 202 and changed data", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          expect(res.body.article.votes).to.equal(1);
        });
    });
    it("PUT (query down) responds with 202 and changed data", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          expect(res.body.article.votes).to.equal(-1);
        });
    });
    it("PUT (bad query) responds with 400 and error message", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=sideways`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Error 400: Bad Query");
        });
    });
  });

  // Articles (All comments by article ID) //

  describe("/api/articles/:article_id/comments", () => {
    it("GET responds with 200 and all comments for article ID", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments[0]).to.have.keys(
            "votes",
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "created_at",
            "__v"
          );
          expect(res.body.comments.length).to.equal(2);
        });
    });
    it("GET responds with 404 and an error message", () => {
      return request
        .get(`/api/articles/${wrongID}/comments`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Error 404: No Comments Found");
        });
    });
    it("GET responds with 400 and an error message", () => {
      return request
        .get(`/api/articles/itsfreerealestate/comments`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            `Cast to ObjectId failed for value "itsfreerealestate" at path "belongs_to" for model "comments"`
          );
        });
    });
    it("POST responds with 201 and new comment", () => {
      const comment = {
        body: "This is my new comment",
        created_by: wrongID
      };
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send(comment)
        .expect(201)
        .then(res => {
          expect(res.body.comment.body).to.equal("This is my new comment");
          expect(res.body.comment).to.contain.all.keys(
            "votes",
            "_id",
            "body",
            "created_by",
            "belongs_to",
            "created_at",
            "__v"
          );
        });
    });
    it("POST responds with 404 and an error message", () => {
      const comment = {
        body: "This is my new comment",
        created_by: wrongID
      };
      return request
        .post(`/api/articles/123/comments`)
        .send(comment)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            `comments validation failed: belongs_to: Cast to ObjectID failed for value "123" at path "belongs_to"`
          );
        });
    });
  });

  // Comments (Vote, Delete, All) //

  describe("/api/comments", () => {
    it("PUT (query up) responds with 202 and changed data", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          expect(res.body.comment.votes).to.equal(8);
        });
    });
    it("PUT (query down) responds with 202 and changed data", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          expect(res.body.comment.votes).to.equal(6);
        });
    });
    it("PUT (query down) responds with 202 and changed data", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=sideways`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Error 400: Bad Query");
        });
    });
    it("DELETE responds with 200 and changed data", () => {
      return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
        .expect(202)
        .then(res => {
          return request.get("/api/comments/").then(res => {
            console.log(res.body.comments[0]);
            expect(res.body.comments.length).to.equal(7);
            expect(res.body.comments[0].body).to.equal(
              " I carry a log — yes. Is it funny to you? It is not to me."
            );
          });
        });
    });
    it("DELETE responds with 400 and error message", () => {
      return request
        .delete(`/api/comments/notid`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "notid" at path "_id" for model "comments"'
          );
        });
    });
    it("DELETE responds with 404 and error message", () => {
      return request
        .delete(`/api/comments/${wrongID}`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "notid" at path "_id" for model "comments"'
          );
        });
    });
    it("GET responds with 200 and list of all comments", () => {
      return request
        .get("/api/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments[0]).to.have.keys(
            "votes",
            "_id",
            "body",
            "belongs_to",
            "created_by",
            "created_at",
            "__v"
          );
          expect(res.body.comments.length).to.equal(8);
        });
    });
  });

  // Users (All users) //

  describe("/api/users", () => {
    it("GET responds with 200 and a list of all users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.users.length).to.equal(2);
          expect(res.body.users[0].username).to.equal("butter_bridge");
        });
    });
  });
});
