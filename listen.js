const { PORT = 9090 } = process.env;
const app = require("./app");

app.listen(PORT, err => {
  console.log(`Listening on port: ${PORT}...`);
});
