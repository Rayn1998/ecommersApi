import express, { Express } from 'express';
import mongoose from 'mongoose';
const cookieParser = require('cookie-parser');

import router from './routes';
// ==============
const app: Express = express();

const port = 3001;

// =================
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

// ==============
mongoose
	.connect('mongodb://127.0.0.1:27017/eshopdb')
	.then(() => {
		app.listen(port, () => {
			console.log('API works');
		});
	})
	.catch((err) => console.log(err));
