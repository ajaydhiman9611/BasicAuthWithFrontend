const express = require('express');
const app = express.Router();
const accounts = require('./accounts');

app.use("/accounts", accounts)

module.exports = app