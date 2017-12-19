'use strict';

/**
 * Create a configure`s module
 */
module.exports = {
  	port: process.env.PORT || 3000,
  	db: process.env.MONGODB || 'mongodb://localhost/node-api-boilerplate'
};
