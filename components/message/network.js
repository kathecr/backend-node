const express = require("express");
const multer = require("multer");
const path = require("path");

const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const filterMessages = req.query.user || null;
  try {
    const messageList = await controller.getMessage(filterMessages);
    response.success(req, res, messageList, 200);
  } catch (err) {
    response.error(req, res, "Unexpected Error", 500, err);
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  const { chat, user, message } = req.body;
  try {
    const fullMessage = await controller.addMessage(chat, user, message);
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await controller.deleteMessage(id);
    response.success(req, res, `Mensaje ${id} eliminado`, 200);
  } catch (e) {
    response.error(req, res, "Error interno", 500, e);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const data = await controller.updateMessage(id, message);
    response.success(req, res, data, 200);
  } catch {
    response.error(req, res, "Error interno", 500, "Error :'(");
  }
});

module.exports = router;
