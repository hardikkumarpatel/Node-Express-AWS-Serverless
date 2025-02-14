require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { ServerLessErrorHandler, ServerLessSuccessHandler } = require("../../helpers/Response.helper");
const RoleHelper = require("../../helpers/Role.helper");
const { ApiCommonHelper } = require("../../helpers");

function RoleController() { }
/** Create role controller */
RoleController.createRoleController = async (req, res, next) => {
    console.log("[CREATE_ROLE]: Recived request to create a role");
    try {
        const { body: { roleName, permissions } } = req;
        if (!roleName || !permissions) {
            ApiCommonHelper.throwError("All fields are required, e.g [roleName, permissions]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }
        if (await RoleHelper.checkRoleAlreadyExits(req)) {
            ApiCommonHelper.throwError("Role already exists", "RequestEntityAlreadyExists", StatusCodes.CONFLICT)
        }

        const timestamp = Date.now().toString();
        const pk_id = `role#${timestamp}`;
        const sk_id = timestamp;
        const params = {
            TableName: "uat-mos-2-29-dev",
            Item: {
                pk_id,
                sk_id,
                roleName,
                permissions,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_ROLE]: Role created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Role created successfully", {}));
    } catch (error) {
        console.log("[CREATE_ROLE]: Error ocurred while creating role", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

/** Get role controller */
RoleController.getRoleController = async (req, res, next) => {
    console.log("[GET_ROLE]: Received request to get all roles");
    try {
        const params = {
            TableName: "uat-mos-2-29-dev",
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "role#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_ROLE]: Role fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Role fetch successfully", data?.Items));
    } catch (error) {
        console.log("[GET_ROLE]: Error ocurred while fetching all roles", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.code || error.cause, error.message, error.stack)
        );
    }
};

/** Update role controller */
RoleController.updateRoleController = async (req, res, next) => {
    console.log("[UPDATE_ROLE]: Received request to update a role");
    const {
        params: { pk_id },
        body: { roleName, permissions }
    } = req;
    try {
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }
        if (!roleName || !permissions) {
            ApiCommonHelper.throwError("All fields are required e.g [roleName, permissions]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: "uat-mos-2-29-dev",
            Key: {
                pk_id
            },
            UpdateExpression: "SET roleName = :roleName, #permissions = :permissions",
            ExpressionAttributeNames: {
                "#permissions": "permissions",
            },
            ExpressionAttributeValues: {
                ":roleName": roleName,
                ":permissions": permissions,
            },
            ReturnValues: "ALL_NEW",
        };
        const data = await req.db.update(params).promise();
        console.log("[UPDATE_ROLE]: Role updated successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Role updated successfully", data));
    } catch (error) {
        console.log("[UPDATE_ROLE]: Error ocurred while updating role", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

/** Delete role controller */
RoleController.deleteRoleController = async (req, res, next) => {
    console.log("[DELETE_ROLE]: Received request to delete a role");
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
        console.log("[DELETE_ROLE]: Role deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Role deleted successfully", null));
    } catch (error) {
        console.log("[DELETE_ROLE]: Error ocurred while deleting role", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

module.exports = RoleController; /** Export the RoleController Fn */
