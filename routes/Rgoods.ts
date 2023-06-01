import express from 'express';
import { celebrate } from 'celebrate';
import {
	createGood,
	getAllGoods,
	updateGood,
	getFilteredGoods,
	deleteGood,
} from '../controllers/Cgoods';
import {
	createGoodValidation,
	updateGoodValidation,
} from '../utils/celebrateValidation';
// =================================

const goods = express.Router();

goods.get('/', getAllGoods);

goods.get('/filtered', getFilteredGoods);

goods.post('/', celebrate(createGoodValidation), createGood);

goods.patch('/', celebrate(updateGoodValidation), updateGood);

goods.delete('/:id', deleteGood);

export default goods;
