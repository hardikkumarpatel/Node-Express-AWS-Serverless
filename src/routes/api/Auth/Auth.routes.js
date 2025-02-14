const express = require("express");
const { AuthController } = require("../../../controller");
const routes = express.Router();

routes.route("/login").post(AuthController.userLoginController);
routes.route("/addpassword").post(AuthController.addPassword)

module.exports = routes;