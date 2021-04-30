const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const chatList = await controller.listChats(userId);
    response.success(req, res, chatList, 200);
  } catch (err) {
    response.error(req, res, "Unexpected Error", 500, err);
  }
});

router.post("/", async (req, res) => {
  const { users } = req.body;
  try {
    const data = await controller.addChat(users);
    response.success(req, res, data, 201);
  } catch {
    response.error(
      req,
      res,
      "Información invalida",
      500,
      "Error en el controlador"
    );
  }
});

module.exports = router;
