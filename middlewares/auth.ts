import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

import User from '../models/Muser';
import { ISignIn } from '../types/auth';
// =============================

type TUser = {_id: string, email: string, password?: string, name: string, favourites: string[], token: string};

export const signIn = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password }: ISignIn = req.body;
	try {
		const user = await User.findOne<TUser>({ email }).select('email password name favourites');
		if (user) {
			const passwordCorrect = await bcrypt.compare(password, user.password);
			if (passwordCorrect) {
				const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
				const userSend: TUser = { _id: user._id, email: user.email, name: user.name, favourites: user.favourites, token };
				res.status(200).send(userSend);
			} else {
				throw new Error;
			}
		} else {
			throw new Error;
		}
	} catch (err) {
		res.status(400).send({ message: 'data is incorrect ' });
	}
};

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization;
  if (token !== 'null') {
    let verification: boolean;
		verification = await jwt.verify(token, 'secret');
		req.user = verification;
		next();
  } else {
    res.status(400).send({ message: 'User unauthorized' });
		return;
  }
};
