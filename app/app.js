const express = require("express");
const middleware = require("./middlewares");
const router = require('./router')
const { notFoundError, serverError } = require("./error");

const app = express();


// Using middlewares
app.use(middleware);

//Using routes middleware
app.use('/api/v1/', router)

// Using error middlewares
app.use(notFoundError, serverError);

module.exports = app;
