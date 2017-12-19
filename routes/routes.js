'use strict';

/** 
 * Consts
 */
const express = require('express');
const ItemsController = require('../controllers/items');
const routes = express.Router();

/**
 * Routes
 */
routes.get('/', ItemsController.getAll);
routes.get('/:itemId', ItemsController.getById);
routes.post('/', ItemsController.insert);
routes.put('/:itemId', ItemsController.update);
routes.delete('/:itemId', ItemsController.delete);

/**
 * Export module
 */
module.exports = routes;
