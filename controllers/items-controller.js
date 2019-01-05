"use strict";

/*
 * Imports
 */
const Item = require('../models/item-model');

/*
 * Controller
 */
const ItemsController = {
    /* Get all Items */
    getAll: (req, res) => {
        Item.find({}, (err, items) => {
            if(err) return res.status(500).json({
                response: {
                    status: 500,
                    error: `${err}`,
                    message: `Error al intentar realizar la petición`
                }
            });
            if(!items) return res.status(404).json({
                response: {
                    status: 404,
                    erroe: `${err}`,
                    message: `No se encontró la petición`
                }
            });
            if(items.length < 1) return res.status(200).json({
                response: {
                    status: 200,
                    message: `No existen items`
                }
            });
            res.status(200).json({
                response: {
                    status: 200,
                    items: items
                }
            });
        });
    },
    /* Get item by id */
    getById: (req, res) => {
        let itemId = req.params.itemId;
        Item.findById(itemId, (err, item) => {
            if(err) return res.status(500).json({
                response: {
                    status: 500,
                    error: `${err}`,
                    message: `Error al intentar realizar la petición`
                }
            });
            if(!item) return res.status(404).json({
                response: {
                    status: 404,
                    erro: `${err}`,
                    message: `No se encontró la petición`
                }
            });
            res.status(200).json({
                response: {
                    status: 200,
                    item: item
                }
            });
        });
    },
    /* Add new item */
    insert: (req, res) => {
        let item = new Item();
        Item.name = req.body.name;
        Item.price = req.body.price;

        Item.save( (err, newItem) => {
            if(err) res.status(500).json({
                response: {
                    status: 500,
                    error: `${err}`,
                    message: `Error al intentar realizar la petición`
                }
            });
            res.status(200).json({
                response: {
                    status: 200,
                    item: newItem
                }
            });
        });
    },
    /* Update a item */
    update: (req, res) => {
        let itemtId = req.params.itemId;
        let update = req.body;
        Item.findByIdAndUpdate(itemtId, update, (err, itemUpdated) => {
            if(err) res.status(500).json({
                response: {
                    status: 500,
                    error: `${err}`,
                    message: `Error al intentar realizar la petición`
                }
            });
            res.status(200).json({
                response: {
                    status: 200,
                    item: itemUpdated,
                    message: `Petición realizada exitosamente`
                }
            });
        });
    },
    /* Delete a item */
    delete: (req, res) => {
        let itemId = req.params.itemId;
        Item.findById(itemId, (err, item) => {
            if(err) res.status(500).json({
                response: {
                    status: 500,
                    error: `${err}`,
                    message: `Error al intentar realizar la petición`
                }
            });

            Item.remove( err => {
                if(err) res.status(500).json({
                    response: {
                        status: 500,
                        error: `${err}`,
                        message: `Error al intentar realizar la petición`
                    }
                });
                res.status(200).json({
                    response: {
                        status: 200,
                        message: `Petición realizada exitosamente`
                    }
                });
            });
        });
    }
};

/*
 * Export Module
 */
module.exports = ItemsController;
