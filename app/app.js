const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const middleware = require("./middlewares");
const router = require("./router");
const { notFoundError, serverError } = require("./error");

const app = express();

// Serving the yaml documents
const swaggerDocs = YAML.load("openapi.yaml");
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Using middlewares
app.use(middleware);

//Using routes middleware
app.use("/api/v1/", router);

// Using error middlewares
app.use(notFoundError, serverError);

module.exports = app;
