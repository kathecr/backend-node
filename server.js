const express = require('express')
//Importar express con sintaxis de ECMAScript6
// import express from 'express'

var app = express();
app.use('/', function(req,res){
  res.send('Hola')
});

app.listen(3000)
console.log('La aplicación est escuchando en http://localhost:3000');
