'use strict';

/**
 * Const
 */
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('../routes/routes');

/**
 * Middleware
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/node/api/boilerplate', routes);

/**
 * Export module
 */
module.exports = app;
