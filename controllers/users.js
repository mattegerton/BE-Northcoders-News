const { User } = require("../models/");

const allUsers = (req, res, next) => {
  User.find()
    .then(users => {
      if (users.length === 0) {
        throw { msg: "Error 404: No Users Found", status: 404 };
      } else {
        res.send({ users });
      }
    })
    .catch(err => {
      next(err);
    });
};

const userById = (req, res, next) => {
  User.findById(req.params.user_id)
    .then(user => {
      if (!user) {
        throw { msg: "Error 404: No User Found", status: 404 };
      } else {
        res.send({ user });
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { allUsers, userById };
