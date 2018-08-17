const usersRouter = require("express").Router();
const allUsers = require("../controllers/users.js");

usersRouter.route("/").get(allUsers);

module.exports = usersRouter;
