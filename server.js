const url_db = require("./config").URL_DB;
const port = require("./config").PORT;

const express = require("express");
const app = express();

const cors = require("cors");
const socket = require("./socket");
const router = require("./network/routes");
const db = require("./db");
const server = require("http").Server(app);

db(url_db);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

socket.connect(server);

app.use("/app", express.static("public"));

server.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
