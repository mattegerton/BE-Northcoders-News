const router = require("express").Router();
const topicsRouter = require("./topics.js");

router.use("/topics", topicsRouter);

module.exports = router;
