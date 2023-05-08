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
import BadAuthError from '../utils/errors/BadAuthError';
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
			const user = await User.findById(payload.id).populate('favourites').select(
				'email favourites name role'
			);
			res.status(200).send(user);
			return;
		} catch (err) {
			next(new BadAuthError(userUnauthorized));
		}
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await User.find({})
		if (users) {
			res.status(200).send({ data: users });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		next(new serverError(serverErrorMsg));
		return;
	}
}

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, role }: IUserOptional = req.body;
	const { id } = req.params;
	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ name, email, role },
			{ new: true, runValidators: true }
		);
		if (user) {
			res.status(200).send({ data: user });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		next(new serverError(serverErrorMsg));
		return;
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
		next(err);
	}
};

export const addFavourite = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id: goodId } = req.params;
	const { id: userId }: any = req.user;
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
	const { id: userId }: any = req.user;
	// console.log(goodId);
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
