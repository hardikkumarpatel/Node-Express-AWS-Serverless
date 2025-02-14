require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { ServerLessErrorHandler, ServerLessSuccessHandler } = require("../../helpers/Response.helper");
const { ApiCommonHelper } = require("../../helpers");

function NotificationController() { }
/** Create notifications */
NotificationController.addNotofications = async (req, res, next) => {
    console.log("[CREATE_NOTIFICATIONS]: Recived request to create a notification");
    const { body: {
        titleChinese,
        titleEnglish,
        subtitleChinese,
        subtitleEnglish,
        messageChinese,
        messageEnglish,
        sendDate,
        audienceType,
        membershipLevel,
        membershipRole,
        ageGroup,
        membershipType,
    } } = req;
    try {
        if (!titleChinese ||
            !titleEnglish ||
            !messageChinese ||
            !messageEnglish ||
            !sendDate ||
            !audienceType) {
            ApiCommonHelper.throwError("Required fileds are missing", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `notification#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                titleChinese,
                titleEnglish,
                subtitleChinese,
                subtitleEnglish,
                messageChinese,
                messageEnglish,
                sendDate,
                audienceType,
                membershipLevel,
                membershipRole,
                ageGroup,
                membershipType,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_NOTIFICATIONS]: Notification created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Notification created successfully", {}));
    } catch (error) {
        console.log("[CREATE_NOTIFICATIONS]: Error ocurred while creating notification", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

/** Get notifications */
NotificationController.getNotifications = async (req, res, next) => {
    console.log("[GET_NOTIFICATIONS]: Recived request to get all notification");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "notification#",
            },
        };

        const data = await req.db.scan(params).promise();
        console.log("[GET_NOTIFICATIONS]: Notification fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Notification fetch successfully", data?.Items));
    } catch (error) {
        console.log("[GET_NOTIFICATIONS]: Error ocurred while fetching all notification", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

module.exports = NotificationController; /** Export the NotificationController Fn */
