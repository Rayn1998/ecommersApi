import express from 'express';
import { celebrate } from 'celebrate';
import {
	getUser,
	updateUser,
	deleteUser,
	addFavourite,
	removeFavourite,
	getAllUsers,
} from '../controllers/Cusers';
import {
	updateUserValidation,
	deleteUserValidation,
	FavouritesValidation,
} from '../utils/celebrateValidation';
// ================================

const users = express.Router();

// users.post('/', celebrate(createUserValidation), createUser);
users.get('/', getUser);

users.get('/all', getAllUsers);

users.put('/:id', celebrate(FavouritesValidation), addFavourite);

users.delete('/:id', celebrate(FavouritesValidation), removeFavourite);

users.patch('/:id', celebrate(updateUserValidation), updateUser);

users.delete('/:id', celebrate(deleteUserValidation), deleteUser);

export default users;
