const express = require("express");
const { NotificationController } = require("../../../controller");
const routes = express.Router();

routes.route("/").get(NotificationController.getNotifications)
    .post(NotificationController.addNotofications);

module.exports = routes;