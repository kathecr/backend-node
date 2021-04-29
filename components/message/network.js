const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", async (req, res) => {
  const filterMessages = req.query.user || null;
  try {
    const messageList = await controller.getMessage(filterMessages);
    response.success(req, res, messageList, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", 500, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const fullMessage = await controller.addMessage(
      req.body.user,
      req.body.message
    );
    response.success(req, res, fullMessage, 201);
  } catch {
    response.error(
      req,
      res,
      "Información invalida",
      400,
      "Error en el controlador"
    );
  }
});

router.delete("/", (req, res) => {
  console.log(req.query);
  if (req.query.error == "ok") {
    response.error(
      req,
      res,
      "Error inesperado",
      500,
      "Es solo una simulación de los errores"
    );
  } else {
    console.log(req.body);
    response.success(req, res, "Eliminado correctamente");
  }
});

router.patch("/:id", async (req, res) => {

  const {id} = req.params;
  const {message} = req.body;
  try {
    const data = await controller.updateMessage(id, message);
    response.success(req, res, data, 200);
  } catch{
    response.error(req, res, "Error interno", 500, "Error :'(");
  }
});

module.exports = router;
