import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
const cookieParser = require('cookie-parser');

import router from './routes';

// ==============
const app: Express = express();

const { PORT = 3001 } = process.env;

// =================
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

// ==============
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => {
		app.listen(PORT, () => {
			console.log('API works');
		});
	})
	.catch((err) => console.log(err));
