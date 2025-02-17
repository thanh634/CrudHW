const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.show);
router.post("/", controller.createUser);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);

module.exports = router;