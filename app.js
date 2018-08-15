const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const { DB_URL } = require("./config");

app.use(bodyParser.json());
app.use("/api", apiRouter);

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`Connected to ${DB_URL}`);
  });

// Error Handling

app.use("/*", (req, res, next) => {
  res.status(404).send("Error 404: Page Not Found.");
});

module.exports = app;
