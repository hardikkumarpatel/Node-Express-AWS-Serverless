function RoleHelper() { }
RoleHelper.checkRoleAlreadyExits = async (req) => {
    const { body: { roleName } } = req;

    const params = {
        TableName: process.env.ROLE_TABLE,
        FilterExpression: "roleName = :roleName",
        ExpressionAttributeValues: {
            ":roleName": roleName,
        },
    };
    const scan = await req.db.scan(params).promise();
    if (scan?.Items?.length > 0) {
        return true;
    }
    return false;
}

module.exports = RoleHelper;