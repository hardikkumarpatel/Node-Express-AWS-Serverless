const express = require("express");
const { MemberController } = require("../../../controller");
const routes = express.Router();

routes.route("/").get(MemberController.getMemberBasicInfo);
routes.route("/addmember").post(MemberController.addBasicMemberInfo);
routes.route("/addinstructor").post(MemberController.addInstuctorInfo);
routes.route("/addinterests").post(MemberController.addInterestsInfo);
routes.route("/addmembership").post(MemberController.addMemberShipInfo);

module.exports = routes;