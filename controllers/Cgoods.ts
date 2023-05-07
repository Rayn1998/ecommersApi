import Good from '../models/Mgood';
import { Request, Response, NextFunction } from 'express';
import { IGoodDataIncome } from '../types/goods';
import { IGoodFilter } from '../types/goods';
import serverError from '../utils/errors/serverError';
import NotFoundError from '../utils/errors/NotFoundError';
import {
	goodDeleted,
	serverErrorMsg,
	notFoundErrorMsg,
} from '../utils/constants';
// =========================

export const createGood = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, brand, categorie, image, price }: IGoodDataIncome = req.body;
	try {
		const good = await Good.create<IGoodDataIncome>({
			name,
			brand,
			categorie,
			image,
			price,
		});
		res.status(200).send({ data: good });
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const deleteGood = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const good = await Good.findByIdAndDelete(id);
		if (good) {
			res.status(200).send({ message: goodDeleted, good });
			return;
		} else {
			throw new NotFoundError(notFoundErrorMsg);
		}
	} catch (err) {
		next(err);
	}
};

export const getAllGoods = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const goods = await Good.find({});
		res.status(200).send({ data: goods });
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const getFilteredGoods = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const filter: IGoodFilter = req.body;
	let goods: object[];
	try {
		goods = await Good.find({ ...filter });
		if (goods.length === 0) {
			res.status(200).send({ message: 'Nothing found:(' });
			return;
		}
		res.status(200).send({ data: goods });
	} catch (err) {
		throw new Error('Error');
	}
};
