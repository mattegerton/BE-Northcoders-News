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

module.exports = allUsers;
