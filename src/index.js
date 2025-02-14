
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const serverless = require('serverless-http');
const routes = require('./routes');
const { ApiCommonHelper } = require("./helpers");
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'ap-east-1'
}); /** Connect to AWS */
const app = express()

app.use(express.json({ strict: false }));
app.options("*", cors());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "OPTIONS", "PATCH", "POST", "DELETE"]
    })
); /** CORS handeling */
app.use(helmet()); /** Hide the security response headers */
app.use(ApiCommonHelper.initializeDatabase); /** Initialize database */
app.get('/', ApiCommonHelper.getDefaultRoute);
app.use(routes); /** All APIs routes */
app.use("*", ApiCommonHelper.useGlobalRoute);

module.exports.handler = serverless(app, { provider: 'aws', });

// app.listen(3010, () => console.log("App is RUNNING ON PORT", 3010));