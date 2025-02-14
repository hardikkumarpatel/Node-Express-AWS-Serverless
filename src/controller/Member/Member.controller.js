require('aws-sdk').config.setPromisesDependency(require('bluebird'));
const { StatusCodes } = require("http-status-codes");
const { ServerLessErrorHandler, ServerLessSuccessHandler } = require("../../helpers/Response.helper");
const { ApiCommonHelper } = require("../../helpers");

function MemberController() { }
/** Create member basic info controller */
MemberController.addBasicMemberInfo = async (req, res, next) => {
    console.log("[CREATE_MEMBER]: Received request to create a member info");
    const { body: {
        input1, // Name
        input2, // Date of Birth
        input3, // Gender
        input4, // Phone
        input5, // Email
        input6, // Language
        input7, // Member ID
        input8, // Card Ref
        input9,
    } } = req;
    try {
        if (!input1 || !input5 || !input7) {
            ApiCommonHelper.throwError("Name, Email, and Member ID are required", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `basicinfo#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id, // Partition key
                sk_id, // Sort key
                name: input1, // Name
                dob: input2, // Date of Birth
                gender: input3, // Gender
                phone: input4, // Phone
                email: input5, // Email
                language: input6, // Language
                memberId: input7, // Member ID
                cardRef: input8, // Card Reference
                joinedDate: input9, // Joined Date
            },
        };

        await req.db.query(params).promise()
        console.log("[CREATE_MEMBER]: Member basic information created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Member basic information created successfully", {}));
    } catch (error) {
        console.log("[CREATE_MEMBER]: Error ocurred while creating member info", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

/** Get member basic info controller */
MemberController.getMemberBasicInfo = async (req, res, next) => {
    console.log("[GET_MEMBER]: Received request to get all member");
    try {
        const params = {
            TableName: process.env.ROLE_TABLE,
            FilterExpression: "begins_with(pk_id, :prefix)",
            ExpressionAttributeValues: {
                ":prefix": "basicinfo#",
            },
        };
        const data = await req.db.scan(params).promise();
        console.log("[GET_MEMBER]: Member basic information fetch successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Member basic information fetch successfully", data?.Items));
    } catch (error) {
        console.log("[GET_MEMBER]: Error ocurred while fetching all member info", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

MemberController.addInstuctorInfo = async (req, res, next) => {
    console.log("[CREATE_INSTRUCTOR]: Received request to create instructor info");
    const { body: { input1, input2, input3, input4 } } = red;
    try {
        if (!input1 || !input2 || !input3 || input4) {
            ApiCommonHelper.throwError("All fields are required e.g [qualifications and BIOs in both languages]", "FieldValidationError", StatusCodes.BAD_REQUEST)
        };

        const pk_id = `instructor#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                qualificationChinese: input1,
                bioChinese: input2,
                qualificationEnglish: input3,
                bioEnglish: input4,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_INSTRUCTOR]: Instructor information created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Instructor information created successfully", {}));
    } catch (error) {
        console.log("[CREATE_INSTRUCTOR]: Error ocurred while creating instructor info", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

MemberController.addInterestsInfo = async (req, res, next) => {
    console.log("[CREATE_INTERESTS]: Received request to create interests info");
    const { body: { interests } } = req;
    try {
        if (!Array.isArray(interests)) {
            ApiCommonHelper.throwError("Interests should be an array", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }

        const pk_id = `interests#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                interests,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_INTERESTS]: Interests info created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Interests info created successfully", {}));
    } catch (error) {
        console.log("[CREATE_INTERESTS]: Error ocurred while creating interests info", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
};

MemberController.addMemberShipInfo = async (req, res, next) => {
    console.log("[CREATE_MEMBERSHIP]: Received request to create membership info");
    const { body: { input1, input2, input3, input5, input6 } } = req;
    try {
        if (!input1 || !input2 || !input3 || !input5 || !input6) {
            ApiCommonHelper.throwError("Membership Level, Status, Ops Centre, Type, and Role are required", "FieldValidationError", StatusCodes.BAD_REQUEST)
        }

        const pk_id = `membership#${Date.now().toString()}`;
        const sk_id = Date.now().toString();
        const params = {
            TableName: process.env.ROLE_TABLE,
            Item: {
                pk_id,
                sk_id,
                membershipLevel: input1,
                membershipStatus: input2,
                opsCentre: input3,
                membershipType: input5,
                membershipRole: input6,
            },
        };
        await req.db.put(params).promise();
        console.log("[CREATE_MEMBERSHIP]: Membership info created successfully");
        return res.status(StatusCodes.OK).send(new ServerLessSuccessHandler(StatusCodes.OK, "Membership details created successfully", {}));
    } catch (error) {
        console.log("[CREATE_INTERESTS]: Error ocurred while creating membership info", error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).send(
            new ServerLessErrorHandler(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.cause, error.message, error.stack)
        );
    }
}

module.exports = MemberController; /** Export the MemberController Fn */
