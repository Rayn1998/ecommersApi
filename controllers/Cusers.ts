import User from '../models/Muser';
import { Request, Response, NextFunction } from 'express';
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
		const user = await User.create<IUser>({
			name,
			email,
			password,
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
		console.log(user)
		if (user) {
			res.status(200).send({ message: 'The following user is deleted', user });
			return;
		} else {
			throw new notFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		console.log(err)
		throw new serverError(serverErrorMsg);
	}
}