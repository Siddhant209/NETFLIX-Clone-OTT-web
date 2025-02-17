const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
router.route("/Registration").post(userController.Register)
router.route("/Login").post(userController.Login)
router.route("/Logout/:id").delete(userController.Logout)
router.route("/").get(userController.getDate)
module.exports = router;