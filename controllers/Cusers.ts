import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

import User from '../models/Muser';
import { IUserDataIncome, IUser, IUserOptional } from '../types/users';

import serverError from '../utils/errors/serverError';
import {
	serverErrorMsg,
	notFoundErrorMsg,
	userUnauthorized,
	userDeleted,
	emailAlreadyUsed,
} from '../utils/constants';
import NotFoundError from '../utils/errors/NotFoundError';
import BadAuthError from '../utils/errors/badAuthError';
// ==========================

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, role }: IUserDataIncome = req.body;
	try {
		const exist = await User.find({ email });
		if (exist.length > 0) {
			res.status(409).send({ message: emailAlreadyUsed });
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

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let payload;
	if (!req.headers.authorization) {
		next(new BadAuthError(userUnauthorized));
	} else {
		const token = req.headers.authorization;
		payload = jwt.verify(token, 'secret');
		try {
			const user = await User.findById(payload.id).select(
				'email favourites name role'
			);
			res.status(200).send(user);
			return;
		} catch (err) {
			next(new BadAuthError(userUnauthorized));
		}
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
		if (user) {
			res.status(200).send({ message: userDeleted, user });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const addFavourite = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id: goodId } = req.params;
	const userId = '644e12639e07e034fb13c5d3';
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $addToSet: { favourites: goodId } },
			{ new: true }
		).populate('favourites');
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const removeFavourite = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id: goodId } = req.params;
	const userId = '644e12639e07e034fb13c5d3';
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $pull: { favourites: goodId } },
			{ new: true }
		).populate('favourites');
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};
