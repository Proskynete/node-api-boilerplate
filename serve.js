'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// connect with DB
const mongoose = require('mongoose');
const nameDataBase = 'node-api-boilerplate';
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${nameDataBase}`, {
	useMongoClient: true
}).then( () => console.log('DB Connected with Mongoose') )
.catch( (err) => console.log(err));

// Setting
app.set('port', process.env.PORT || 3000);

// Middlewers
app.use(cors());
app.use(bodyParser.json());

// init server
app.listen(app.get('port'), () => {
	console.log(`Server run on port ${app.get('port')}`);
});

