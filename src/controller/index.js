const AccountController = require("./Account/Account.controller");
const AuthController = require("./Auth/Auth.controller");
const CampaignsController = require("./Campaigns/Campaigns.controller");
const MemberController = require("./Member/Member.controller");
const NotificationController = require("./Notification/Notification.controller");
const RoleController  = require("./Role/Role.controller");

module.exports = {
    AccountController,
    RoleController,
    CampaignsController,
    AuthController,
    MemberController,
    NotificationController
}