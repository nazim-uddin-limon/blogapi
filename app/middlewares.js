const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const middleware = [cors(), express.json(), morgan("dev")];

module.exports = middleware;
