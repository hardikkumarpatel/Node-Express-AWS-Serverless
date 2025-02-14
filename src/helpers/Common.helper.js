const AWS = require('aws-sdk');
const { StatusCodes } = require("http-status-codes");
const { ServerLessErrorHandler, ServerLessSuccessHandler } = require("./Response.helper");
AWS.config.setPromisesDependency(require('bluebird'));

class ApiCommonHelper {
    static useGlobalRoute = async (req, res, next) => {
        return res.status(StatusCodes.NOT_FOUND).send(
            new ServerLessErrorHandler(StatusCodes.NOT_FOUND, "Request resource not found")
        )
    };

    static getDefaultRoute = async (req, res, next) => {
        const {
            env: { NODE_ENV },
            platform,
            pid
        } = process;
        return res.status(StatusCodes.OK).send(
            new ServerLessSuccessHandler(StatusCodes.OK, "Welcome to NODE AWS Serverless app", {
                mode: NODE_ENV,
                platfrom: platform,
                uptime: `${process.uptime()} seconds`,
                timestamp: Date.now()
            })
        )
    }

    static initializeDatabase = async (req, res, next) => {
        if (req.db) next();
        const IS_OFFLINE = process.env.IS_OFFLINE;
        if (IS_OFFLINE === 'true') {
            req.db = new AWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            });
            next();
        } else {
            req.db = new AWS.DynamoDB.DocumentClient();
            next();
        };
    }

    static throwError = (message, cause, code) => {
        let error = new Error(message, { cause });
        error.code = code;
        throw error;
    }
}

module.exports.ApiCommonHelper = ApiCommonHelper;