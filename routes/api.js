const router = require("express").Router();
const topicsRouter = require("./topics.js");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users.js");

router.use("/topics", topicsRouter);
router.use("/articles", articlesRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);

module.exports = router;
