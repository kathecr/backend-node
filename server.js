// //Importar express con sintaxis de ECMAScript6
// // import express from 'express'
const express = require("express");
const response = require("./network/response");

var app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--GESTION DE LAS PETICIONES
app.get("/message", (req, res) => {
  console.log(req.headers);
  res.header({
    "custom-header": "Nuestro valor personalizado",
  });
  // res.send("Lista de mensajes");
  response.success(req, res, "Lista de mensajes");
});
app.post("/message", (req, res) => {
  //Respuesta plana
  // res.send("Mensaje añadido correctamente");
  //Respuesta con información Status
  // res.status(201).send({ error: "", body: "Eliminado correctamente" });
  response.success(req, res, "Creado correctamente", 201);
});
app.delete("/message", (req, res) => {
  console.log(req.query);
  if (req.query.error == "ok") {
    response.error(req, res, "Error simulado", 400);
  } else {
    console.log(req.body);
    // res.send("Mensaje " + req.body.text + " eliminado");
    response.success(req, res, "Eliminado correctamente");
  }
});

app.use("/app", express.static("public"));

app.listen(port, () =>
  console.log("La aplicación est escuchando en http://localhost:3000")
);
