const { Router } = require("express");
const routes = Router();

routes.use("/api/v1", require("./api"));
module.exports = routes;
