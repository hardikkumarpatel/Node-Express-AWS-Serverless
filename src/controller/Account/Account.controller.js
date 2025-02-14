require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { AccountHelper, ServerLessSuccessHandler, ServerLessErrorHandler, ApiCommonHelper } = require("../../helpers");
const bcrypt = require("bcrypt");

function AccountController() { }
AccountController.createUserAccountController = async (req, res, next) => {
    console.log("[CREATE_ACCOUNT]: Received request to create a account");
    try {
        const { body: { accountName, login, password, role } } = req;
        if (!accountName || !login || !password || !role) {
            ApiCommonHelper.throwError("All fields are required, e.g [accountName, login, password, role]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        if (await (AccountHelper.checkAccountLoginAlreadyExits(req))) {
            ApiCommonHelper.throwError("Account with login already exists", "RequestEntityAlreadyExists", StatusCodes.CONFLICT)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const pk_id = `user#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                accountName,
                login,
                password: hashedPassword,
                role,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_ACCOUNT]: Account created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Account created successfully", {}));
    } catch (error) {
        console.log("[CREATE_ACCOUNT]: Error ocurred while creating account", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

AccountController.getUserAccountController = async (req, res, next) => {
    console.log("[GET_ACCOUNT]: Received request to get all accounts");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "user#"
            }
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_ACCOUNT]: Accounts fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Account Fetch Successfully", data?.Items));
    } catch (error) {
        console.log("[GET_ACCOUNT]: Error ocurred while fetching all account", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

AccountController.updateUserAccountController = async (req, res, next) => {
    console.log("[UPDATE_ACCOUNT]: Received request to update accounts");
    try {
        const { params: { pk_id }, body: { accountName, login, password, role } } = req;
        if (!pk_id || pk_id?.includes(":pk_id")) {
            ApiCommonHelper.throwError("Primary Key is missing in request params", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }
        if (!accountName || !login || !password || !role) {
            ApiCommonHelper.throwError("All fields are required, e.g [accountName, login, password, role]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const params = {
            TableName: process.env.ROLE_TABLE,
            Key: { pk_id },
            UpdateExpression: "set accountName = :accountName, login = :login, #password = :password, #role = :role",
            ExpressionAttributeValues: {
                ":accountName": accountName,
                ":login": login,
                ":password": await bcrypt.hash(password, 10),
                ":role": role,
            },
            ExpressionAttributeNames: {
                "#password": "password",
                "#role": "role",
            },
            ReturnValues: "ALL_NEW",
        };
        const data = await req.db.update(params).promise();
        console.log("[UPDATE_ACCOUNT]: Account updated successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Account Updated Successfully", data));
    } catch (error) {
        console.log("[UPDATE_ACCOUNT]: Error ocurred while updating account", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

AccountController.deleteUserAccountController = async (req, res, next) => {
    console.log("[DELETE_ACCOUNT]: Received request to delete account");
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
        console.log("[DELETE_ACCOUNT]: Account deleted successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Account Deleted Successfully", null));
    } catch (error) {
        console.log("[DELETE_ACCOUNT]: Error ocurred while deleting account", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

module.exports = AccountController; /** Export the AccountController Fn */
