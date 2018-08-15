process.env.NODE_ENV = "test";
const app = require("../app");
const seedDB = require("../seed/seed");
const data = require("../seed/testData/");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");

describe("Northcoders News Testing...", () => {
  let commentDocs, articleDocs, topicDocs, userDocs;
  beforeEach(() => {
    return seedDB(data).then(docs => {
      [commentDocs, articleDocs, topicDocs, userDocs] = docs;
    });
  });
  after(() => {
    mongoose.disconnect();
  });
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
    it("responds with 404 for an invalid route (with endpoint).", () => {
      return request
        .delete("/api/topics")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal("Error 404: Page Not Found.");
        });
    });
  });

  describe.only("/api/topics/:topic_slug/articles", () => {
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
    it("GET responds with 404 with bad slug.", () => {
      return request
        .get("/api/topics/1/articles")
        .expect(404)
        .then(res => {
          console.log(res.body.msg);
        });
    });
  });
});
