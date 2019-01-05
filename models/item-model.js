'use strict';

/**
 * Const
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */
const ItemSchema = Schema({
  	name: { type: String, require: true },
  	price: { type: Number, require: true }
}, {
	collection: 'Item'
});


/**
 * Export module
 */
module.exports = mongoose.model('Item', ItemSchema);
