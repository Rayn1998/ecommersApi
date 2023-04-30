import express from 'express';
import { celebrate } from 'celebrate';
import {
	createGood,
	getAllGoods,
	getFilteredGoods,
} from '../controllers/Cgoods';
import { createGoodValidation } from '../utils/celebrateValidation';
// =================================

const goods = express.Router();

goods.get('/', getAllGoods);

goods.get('/filtered', getFilteredGoods);

goods.post('/', celebrate(createGoodValidation), createGood);

export default goods;
