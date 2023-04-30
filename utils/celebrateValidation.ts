import { Joi } from 'celebrate';

// GOODS

export const createGoodValidation = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		brand: Joi.string().required(),
		categorie: Joi.string().required(),
		image: Joi.string().required(),
		price: Joi.number().required(),
		rating: Joi.number().required(),
	}),
};

// USERS

export const createUserValidation = {
	body: Joi.object().keys({
		name: Joi.string().min(2).max(30).required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(8),
		role: Joi.string(),
	}),
};

export const updateUserValidation = {
	body: Joi.object().keys({
		name: Joi.string().min(2).max(30),
		email: Joi.string().email(),
		password: Joi.string().min(8),
		role: Joi.string(),
	}),
};

export const deleteUserValidation = {
	params: Joi.object().keys({
		id: Joi.string().length(24).hex().required(),
	}),
};

export const FavouritesValidation = {
	params: Joi.object().keys({
		id: Joi.string().length(24).hex().required(),
	}),
};