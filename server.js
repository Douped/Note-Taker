// import modules
const express = require("express");
const routes = require("./Develop/routes");

// create express application
const app = express();
const PORT = process.env.PORT || 3001;
// middleware for parsing JSON
app.use(express.json());
// middleware for url-encoded form data
app.use(express.urlencoded({ extended: true }));
// middleware for public directory
app.use(express.static("public"));

app.use(routes);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
