'use strict';

/**
 * Consts
 */
const mongoose = require('mongoose');
const app = require('./config/app.js');
const config = require('./config/config.js');


/**
 * Connect to Database and run app
 */
mongoose.connect(config.db, (err, res) => {
	if(err) return console.log(`${err}`);
	console.log('Connected with mongodb...');

	app.listen(config.port, () => {
    	console.log(`Api running on port: ${config.port}`);
  	});
});
