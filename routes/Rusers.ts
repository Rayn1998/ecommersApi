import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser, updateUser, deleteUser } from '../controllers/Cusers';
import {
	createUserValidation,
	updateUserValidation,
	deleteUserValidation,
} from '../utils/celebrateValidation';
// ================================

const users = express.Router();

users.post('/', celebrate(createUserValidation), createUser);

users.patch('/:id', celebrate(updateUserValidation), updateUser);

users.delete('/:id', celebrate(deleteUserValidation), deleteUser);

export default users;
