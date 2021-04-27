const express = require("express");
// //Importar express con sintaxis de ECMAScript6
// // import express from 'express'
const bodyParser = require("body-parser");
var app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/message", (req, res) => res.send("Lista de mensajes"));
app.post("/message", (req, res) => res.send("Mensaje añadido correctamente"));
app.delete("/message", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.send("Mensaje " + req.body.text + " eliminado");
});

app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
