const express = require("express");
const router = require("./network/routes");
const port = require('./config').PORT;

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

app.use("/app", express.static("public"));

app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
