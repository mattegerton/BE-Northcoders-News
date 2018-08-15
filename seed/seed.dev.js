const seedDb = require("./seed.js");
const data = require("../seed/devData/");
const { DB_URL } = require("../config");
const mongoose = require("mongoose");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`Connected to ${DB_URL}.`);
    return seedDb(data);
  })
  .then(() => {
    mongoose.disconnect();
  });
