import express from 'express';
import mongoose from 'mongoose';

import router from './routes';

// ==============
const app = express();

const port = 3001;

// =================
app.use(express.json());

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
