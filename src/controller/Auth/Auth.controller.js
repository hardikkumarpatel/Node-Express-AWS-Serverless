require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { ServerLessErrorHandler, ServerLessSuccessHandler } = require("../../helpers/Response.helper");
const { ApiCommonHelper } = require("../../helpers");
const bcrypt = require("bcrypt");
function AuthController() { }

/** Login */
AuthController.userLoginController = async (req, res, next) => {
    console.log("[USER_LOGIN]: Received request user login");
    const { body: { login, password } } = req;
    try {
        if (!login || !password || !role) {
            ApiCommonHelper.throwError("All fields are required, e.g [login, password]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };
        const params = {
            TableName: process.env.ROLE_TABLE,
            IndexName: "login-index",
            KeyConditionExpression: "login = :login",
            ExpressionAttributeValues: {
                ":login": login,
            },
        };
        const data = await req.db.query(params).promise()
        if (data.Items.length === 0) {
            ApiCommonHelper.throwError("Invalid login or password", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }

        const user = data.Items[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            ApiCommonHelper.throwError("Invalid login or password", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }

        console.log("[USER_LOGIN]: User login successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "User login successfully", user));
    } catch (error) {
        console.log("[USER_LOGIN]: Error ocurred while user login", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

AuthController.addPassword = async (req, res, next) => {
    console.log("[CREATE_PASSWORD]: Received request to create password");
    const { body: { newPassword, confirmPassword } } = req;
    try {
        if (!newPassword || !confirmPassword) {
            ApiCommonHelper.throwError("New password and confirm password are required", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }
        if (newPassword !== confirmPassword) {
            ApiCommonHelper.throwError("Passwords do not match", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }

        const pk_id = `userpass#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                password: hashedPassword,
            },
        };

        await req.db.put(params).promise()
        console.log("[CREATE_PASSWORD]: Password created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Password created successfully", {}));
    } catch (error) {
        console.log("[CREATE_PASSWORD]: Error ocurred while creating password", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

module.exports = AuthController; /** Export the AuthController Fn */
