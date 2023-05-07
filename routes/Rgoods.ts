import express from 'express';
import { celebrate } from 'celebrate';
import {
	createGood,
	getAllGoods,
	getFilteredGoods,
	deleteGood,
} from '../controllers/Cgoods';
import { createGoodValidation } from '../utils/celebrateValidation';
// =================================

const goods = express.Router();

goods.get('/', getAllGoods);

goods.get('/filtered', getFilteredGoods);

goods.post('/', celebrate(createGoodValidation), createGood);

goods.delete('/:id', deleteGood);

export default goods;
