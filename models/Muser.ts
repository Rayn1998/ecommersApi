import { Schema, model } from 'mongoose';
import { IUser } from '../types/users';

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
		match: /^[a-z0-9]{3,}@[a-z]{2,}\.[a-z]{2,}/,
	},
	password: {
		type: String,
		minLength: 8,
		required: true,
	},
	role: {
		type: String,
		enum: ['customer', 'admin'],
		default: 'customer',
	},
});

export default model<IUser>('user', user);
