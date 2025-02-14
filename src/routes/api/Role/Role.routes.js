const express = require("express");
const { RoleController } = require("../../../controller");
const routes = express.Router();

routes.route("/")
    .get(RoleController.getRoleController)
    .post(RoleController.createRoleController);
routes.route("/:pk_id")
    .put(RoleController.updateRoleController)
    .delete(RoleController.deleteRoleController);

module.exports = routes;