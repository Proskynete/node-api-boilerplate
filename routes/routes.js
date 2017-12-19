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
routes.get('/:postId', ItemsController.getById);
routes.post('/', ItemsController.insert);
routes.put('/:postId', ItemsController.update);
routes.delete('/:postId', ItemsController.delete);

/**
 * Export module
 */
module.exports = routes;
