const { Router } = require("express");
const routes = Router();

routes.use("/roles", require("./Role/Role.routes"));
routes.use("/accounts", require("./Account/Account.routes"));
routes.use("/campaign", require("./Campaigns/Campaigns.routes"));
routes.use("/auth", require("./Auth/Auth.routes"));
routes.use("/member", require("./Member/Member.routes"));
routes.use("/notification", require("./Notification/Notification.routes"));

module.exports = routes;