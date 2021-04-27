const express = require("express");
// //Importar express con sintaxis de ECMAScript6
// // import express from 'express'

var app = express();
const port = 3000;

// app.use("/", (req, res) => res.send("Hola"));

// app.get("/", (req, res) => res.send("Hola desde get"));
// app.post("/", (req, res) => res.send("Hola desde post"));
// app.put("/", (req, res) => res.send("Hola desde put"));

app.get("/message", (req, res) => res.send("Lista de mensajes"));
app.post("/message", (req, res) => res.send("Mensaje añadido"));
app.delete("/message", (req, res) => res.send("Mensaje eliminado"));






app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);

