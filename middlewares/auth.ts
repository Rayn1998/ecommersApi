import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const bcrtypt = require('bcrypt');

import User from '../models/Muser';
import { ISignIn } from '../types/auth';
// =============================

export const signIn = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password }: ISignIn = req.body;
	try {
		const user = await User.findOne({ email }).select('email    password');
		if (user) {
			const passwordCorrect = await bcrtypt.compare(password, user.password);
			if (passwordCorrect) {
				const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
				res.cookie('token', token);
				res.status(200).end();
			}
		} else {
			res.send({ message: 'data is incorrect ' });
		}
	} catch (err) {
		throw new Error('Error');
	}
};

export const signOut = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
  res.clearCookie('token').end();
}

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;

  if (token) {
    let verification: boolean;
    try {
      verification = jwt.verify(token, 'secret');
    } catch (err) {
      throw new Error('User unauthorized');
    }
    req.user = verification;
    next();
  } else {
    res.status(400).send({ message: 'User unauthorized' })
  }
};
