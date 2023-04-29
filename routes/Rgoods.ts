import express from 'express';
import { celebrate } from 'celebrate';
import { createGood, getAllGoods } from '../controllers/Cgoods';
import { createGoodValidation } from '../utils/celebrateValidation';
// =================================

const goods = express.Router();

goods.get('/', getAllGoods);
goods.post('/', celebrate(createGoodValidation), createGood);

export default goods;