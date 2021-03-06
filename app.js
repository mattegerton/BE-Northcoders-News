const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const DB_URL = process.env.DB_URL || require("./config").DB_URL;
const cors = require("cors");

app.use(cors());
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

app.use((err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError")
    err.status = 400;
  res
    .status(err.status || 500)
    .send({ msg: err.msg || err.message || "Internal server error!" });
});

module.exports = app;
