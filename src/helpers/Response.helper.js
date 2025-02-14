const { getReasonPhrase, StatusCodes } = require("http-status-codes");


function ServerLessErrorHandler(statusCode, message, error, stack) {
    Error.captureStackTrace(this, this.constructor);
    this.success = false;
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
    this.data = null;
    this.errors = [
        {
            message: error || message,
            extensions: {
                code: getReasonPhrase(this.statusCode),
                stacktrace: this.stack ? [this.stack.split("\n").map((line) => line.trim())] : [new Error("Something Went Wrong!").stack.split("\n")]
            }
        }
    ];

    if (stack) {
        this.stack = stack;
    } else {
        this.stack = (new Error()).stack;
    }
};
ServerLessErrorHandler.prototype = Object.create(Error.prototype);
ServerLessErrorHandler.prototype.constructor = ServerLessErrorHandler;

function ServerLessSuccessHandler(statusCode, message, data) {
    this.success = true;
    this.statusCode = statusCode || StatusCodes.OK;
    this.message = message || "Success";
    this.errors = [];
    this.data = data || null;
}


module.exports = {
    ServerLessErrorHandler,
    ServerLessSuccessHandler
}
