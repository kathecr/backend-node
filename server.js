const express = require("express");
const router = require("./network/routes");
const port = require('./config').PORT;
const db = require('./db')
const url_db = require("./config").URL_DB;

db(url_db)

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

app.use("/app", express.static("public"));

app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
