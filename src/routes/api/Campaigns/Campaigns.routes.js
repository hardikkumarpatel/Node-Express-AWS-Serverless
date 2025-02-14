const express = require("express");
const CampaignsController = require("../../../controller/Campaigns/Campaigns.controller");
const routes = express.Router();

routes.route("/types")
    .get(CampaignsController.getCampaignTypeController)
    .post(CampaignsController.createCampaignTypeController);
routes.route("/types/:pk_id").delete(CampaignsController.deleteCampaignTypeController);

routes.route("/venue")
    .get(CampaignsController.getCampaignVenuesController)
    .post(CampaignsController.createCampaignVenuesController);
routes.route("/venue/:pk_id").delete(CampaignsController.deleteCampaignVenuesController);

routes.route("/names")
    .get(CampaignsController.getCampaignNameController)
    .post(CampaignsController.createCampaignNameController);
routes.route("/names/:pk_id").delete(CampaignsController.deleteCampaignNameController);

routes.route("/audiences")
    .get(CampaignsController.getCampaignAudiencesController)
    .post(CampaignsController.createCampaignAudiencesController);
routes.route("/audiences/:pk_id").delete(CampaignsController.deleteCampaignAudiencesController);

module.exports = routes;
