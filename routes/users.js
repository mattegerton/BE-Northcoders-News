const usersRouter = require("express").Router();
const { allUsers, userById } = require("../controllers/users.js");

usersRouter.route("/").get(allUsers);

usersRouter.route("/:user_id").get(userById);

module.exports = usersRouter;
