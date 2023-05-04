import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
const cors = require('cors');
const cookieParser = require('cookie-parser');

import router from './routes';

// ==============
const app: Express = express();

const { PORT = 3001 } = process.env;

// =================
app.use(cors({
	origin: 'http://localhost:3000',

}))

app.use(cookieParser());
app.use(express.json());

app.use('/', router);

// ==============
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`API works on port: ${PORT}`);
		});
	})
	.catch((err) => console.log(err));
