function AccountHelper() { }
AccountHelper.checkAccountLoginAlreadyExits = async (req) => {
    const { body: { login } } = req;

    const params = {
        TableName: process.env.ROLE_TABLE,
        FilterExpression: "login = :login",
        ExpressionAttributeValues: {
            ":login": login,
        },
    };
    const scan = await req.db.scan(params).promise();
    if (scan?.Items?.length > 0) {
        return true;
    }
    return false;
}

module.exports = AccountHelper;