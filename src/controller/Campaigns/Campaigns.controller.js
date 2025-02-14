require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { ServerLessSuccessHandler, ServerLessErrorHandler } = require("../../helpers/Response.helper");
const { ApiCommonHelper } = require("../../helpers");

function CampaignsController() { };
/** Campaigns Types */
CampaignsController.createCampaignTypeController = async (req, res, next) => {
    console.log("[CREATE_CAMPAIGN_TYPE]: Received request to create campaing type");
    try {
        const { body: { membertype, descriptionChinese, descriptionEnglish } } = req;
        if (!membertype || !descriptionChinese || !descriptionEnglish) {
            ApiCommonHelper.throwError("All fields are required, e.g [membertype, descriptionChinese, descriptionEnglish]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `cmptype#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                membertype,
                descriptionChinese,
                descriptionEnglish,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_CAMPAIGN_TYPE]: Campaigns type created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns type created successfully", {}));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_TYPE]: Error ocurred while creating campaigns type", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};
CampaignsController.getCampaignTypeController = async () => {
    console.log("[GET_CAMPAIGN_TYPE]: Received request to create campaing type");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "cmptype#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_CAMPAIGN_TYPE]: Campaings type fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns types Fetch Successfully", data?.Items));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_TYPE]: Error ocurred while fetching campaigns type", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.code || error.cause, error.message, error.stack)
        );
    }
};
CampaignsController.deleteCampaignTypeController = async () => {
    console.log("[DELETE_CAMPAIGN_TYPE]: Received request to delete campaing type");
    try {
        const {
            params: { pk_id } }
            = req;
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: "uat-mos-2-29-dev",
            Key: {
                pk_id,
            },
        };
        await req.db.delete(params).promise();
        console.log("[DELETE_CAMPAIGN_TYPE]: Campaign type deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaign type deleted successfully", null));
    } catch (error) {
        console.log("[DELETE_CAMPAIGN_TYPE]: Error ocurred while deleting campaigns type", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.code || error.cause, error.message, error.stack)
        );
    }
}

/** Campaigns Venues */
CampaignsController.createCampaignVenuesController = async () => {
    console.log("[CREATE_CAMPAIGN_VENUE]: Received request to create campaing venue");
    try {
        const { body: {
            incentre,
            venuechines,
            venueenglish } } = req;
        if (!incentre || !venuechines || !venueenglish) {
            ApiCommonHelper.throwError("All fields are required, e.g [incentre, venuechines, venueenglish]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `cmpvenue#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                membertype,
                descriptionChinese,
                descriptionEnglish,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_CAMPAIGN_VENUE]: Campaign venue created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns venue created successfully", {}));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_VENUE]: Error ocurred while creating campaigns venue", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.getCampaignVenuesController = async () => {
    console.log("[GET_CAMPAIGN_VENUE]: Received request to get all campaing venue");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "cmpvenue#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_CAMPAIGN_VENUE]: Campaign venues fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns venues fetch successfully", data?.Items));
    } catch (error) {
        console.log("[GET_CAMPAIGN_VENUE]: Error ocurred while fetching all campaigns venues", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.deleteCampaignVenuesController = async () => {
    console.log("[DELETE_CAMPAIGN_VENUE]: Received request to delete campaing venue");
    try {
        const {
            params: { pk_id } }
            = req;
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: "uat-mos-2-29-dev",
            Key: {
                pk_id,
            },
        };
        await req.db.delete(params).promise();
        console.log("[DELETE_CAMPAIGN_VENUE]: Campaign venue deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaign venue deleted successfully", null));
    } catch (error) {
        console.log("[DELETE_CAMPAIGN_VENUE]: Error ocurred while deleting campaigns venues", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

/** Campaigns Name */
CampaignsController.createCampaignNameController = async () => {
    console.log("[CREATE_CAMPAIGN_NAME]: Received request to create campaing name");
    try {
        const { body: { campaignnamechines, campaignnameenglish } } = req;
        if (!campaignnamechines || !campaignnameenglish) {
            ApiCommonHelper.throwError("All fields are required, e.g [campaignnamechines, campaignnameenglish]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `cmpname#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                membertype,
                descriptionChinese,
                descriptionEnglish,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_CAMPAIGN_NAME]: Campaign name created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns name created successfully", {}));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_NAME]: Error ocurred while creating campaigns name", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.getCampaignNameController = async () => {
    console.log("[GET_CAMPAIGN_NAME]: Received request to get all campaing name");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "cmpname#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_CAMPAIGN_NAME]: Campaigns names fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns Name Fetch Successfully", data?.Items));
    } catch (error) {
        console.log("[GET_CAMPAIGN_NAME]: Error ocurred while fetching all campaigns name", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.deleteCampaignNameController = async () => {
    console.log("[DELETE_CAMPAIGN_NAME]: Received request to delete campaing name");
    try {
        const {
            params: { pk_id } }
            = req;
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: "uat-mos-2-29-dev",
            Key: {
                pk_id,
            },
        };
        await req.db.delete(params).promise();
        console.log("[DELETE_CAMPAIGN_NAME]: Campaign name deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaign Name Deleted Successfully", null));
    } catch (error) {
        console.log("[GET_CAMPAIGN_NAME]: Error ocurred while deleting campaigns name", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

/** Campaigns Audiences */
CampaignsController.createCampaignAudiencesController = async () => {
    console.log("[CREATE_CAMPAIGN_AUDIENCE]: Received request to create campaing audience");
    try {
        const { body: { audienceChinese, audienceEnglish, Code } } = req;
        if (!audienceChinese || !audienceEnglish || !Code) {
            ApiCommonHelper.throwError("All fields are required, e.g [audienceChinese, audienceEnglish, Code]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `cmpaudience#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                audienceChinese,
                audienceEnglish,
                Code,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_CAMPAIGN_AUDIENCE]: Campaigns audiences created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns audiences created successfully", {}));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_AUDIENCE]: Error ocurred while creating campaigns audience", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.getCampaignAudiencesController = async () => {
    console.log("[GET_CAMPAIGN_AUDIENCE]: Received request to get all campaing audience");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "cmpaudience#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_CAMPAIGN_AUDIENCE]: Campaigns audiences fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaigns Audiences Fetch Successfully", data?.Items));
    } catch (error) {
        console.log("[CREATE_CAMPAIGN_AUDIENCE]: Error ocurred while fetching all campaigns audience", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
CampaignsController.deleteCampaignAudiencesController = async () => {
    console.log("[DELETE_CAMPAIGN_AUDIENCE]: Received request to delete campaign audience");
    try {
        const {
            params: { pk_id } }
            = req;
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: "uat-mos-2-29-dev",
            Key: {
                pk_id,
            },
        };
        await req.db.delete(params).promise();
        console.log("[DELETE_CAMPAIGN_AUDIENCE]: Campaign audience deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Campaign audience deleted successfully", null));
    } catch (error) {
        console.log("[DELETE_CAMPAIGN_AUDIENCE]: Error ocurred while deleting campaigns audience", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}
module.exports = CampaignsController; /** Export the CampaignsController Fn */
