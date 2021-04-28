const express = require("express");
const router = require("./network/routes");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000;
router(app);

app.use("/app", express.static("public"));

app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
