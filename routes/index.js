const express = require('express');
const route = express.Router();
const routeUser = require('./user')


route.use('/', routeUser)

module.exports = route