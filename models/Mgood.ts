import { Schema, model } from 'mongoose';
import { IGoodDataIncome } from '../types/goods';

const good = new Schema<IGoodDataIncome>({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Must be at least 2 symbols, got {VALUE}'],
  },
  brand: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default model('good', good);