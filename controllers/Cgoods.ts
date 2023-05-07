import Good from '../models/Mgood';
import { Request, Response, NextFunction } from 'express';
import { IGoodDataIncome } from '../types/goods';
import { IGoodFilter } from '../types/goods';
import serverError from '../utils/errors/serverError';
import { serverErrorMsg } from '../utils/constants';
// =========================

export const createGood = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, brand, categorie, image, price }: IGoodDataIncome =
		req.body;
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
