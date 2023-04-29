import Mgood from '../models/Mgood';
import { Request, Response, NextFunction } from 'express';
import { IGoodDataIncome } from '../types/goods';
import serverError from '../utils/errors/serverError';
import { serverErrorMsg } from '../utils/constants';
// =========================

export const createGood = async (req: Request, res: Response, next: NextFunction) => {
	const { name, brand, categorie, image, price, rating }: IGoodDataIncome =
		req.body;
	try {
		const good = await Mgood.create<IGoodDataIncome>({
			name,
			brand,
			categorie,
			image,
			price,
			rating,
		});
		res.status(200).send({ data: good });
	} catch (err) {
		throw new serverError(serverErrorMsg);
	}
};

export const getAllGoods = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const goods = await Mgood.find({});
		res.status(200).send({ data: goods });
	} catch (err ) {
		throw new serverError(serverErrorMsg);
	}
}

// export const getFilteredGoods = async (req: Request, res: Response, next: NextFunction) => {

// }