const express = require("express");
const { AccountController } = require("../../../controller");
const routes = express.Router();

routes.route("/")
    .get(AccountController.getUserAccountController)
    .post(AccountController.createUserAccountController);
routes.route("/:pk_id")
    .put(AccountController.updateUserAccountController)
    .delete(AccountController.deleteUserAccountController);

module.exports = routes;
