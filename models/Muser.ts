import { Schema, model } from 'mongoose';
import { IUser } from '../types/users';
import { emailCheck } from '../utils/regExpressions';

const user = new Schema<IUser>({
	name: {
		type: String,
		minLength: [2, 'Must be at least 2 symbols, got {VALUE}'],
		maxLength: [30, 'Must be max 30 symbols, got {VALUE}'],
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: emailCheck,
	},
	password: {
		type: String,
		minLength: 8,
		required: true,
	},
	favourites: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'good',
				default: [],
			},
		],
	},
	role: {
		type: String,
		enum: ['customer', 'admin'],
		default: 'customer',
	},
});

export default model<IUser>('user', user);
