const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await controller.addUser(req.body.name);
    response.success(req, res, data, 201);
  } catch (err) {
    response.error(req, res, "Internal Error", 500, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await controller.getUser();
    response.success(req, res, data, 200);
  } catch (err) {
    response.error(req, res, "Internal Error", 500, err);
  }
});

module.exports = router;
