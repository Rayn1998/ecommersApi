import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');

import User from '../models/Muser';
import { IUserDataIncome, IUser, IUserOptional } from '../types/users';

import serverError from '../utils/errors/serverError';
import { serverErrorMsg, notFoundErrorMsg } from '../utils/constants';
import notFoundError from '../utils/errors/notFoundError';
// ==========================

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password, role }: IUserDataIncome = req.body;
	try {
		const exist = await User.find({ email });
		if (exist.length > 0) {
			res.status(409).send({ message: 'This email already used' });
			return;
		}
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create<IUser>({
			name,
			email,
			password: passwordHash,
			role: role ? role : 'customer',
		});
		res.status(200).send({ data: user });
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password, role }: IUserOptional = req.body;
	const { id } = req.params;
	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ name, email, password, role },
			{ new: true, runValidators: true }
		);
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new notFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
		if (user) {
			res.status(200).send({ message: 'The following user is deleted', user });
			return;
		} else {
			throw new notFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
}

export const addFavourite = async (req: Request, res: Response, next: NextFunction) => {
	const { id: goodId } = req.params;
	const userId = "644e12639e07e034fb13c5d3";
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $addToSet: { favourites: goodId } },
			{ new: true }, 
		)
			.populate('favourites');
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new notFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
}

export const removeFavourite = async (req: Request, res: Response, next: NextFunction) => {
	const { id: goodId } = req.params;
	const userId = "644e12639e07e034fb13c5d3";
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $pull: { favourites: goodId } },
			{ new: true }, 
		)
			.populate('favourites');
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new notFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
}