import { NextFunction, Request, Response } from 'express';
import { CuisineModel } from '../models/Cuisine';

export class CuisineController {
    private static cuisineModel = CuisineModel;

    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await CuisineModel.find();

            return res.status(200).json({
                message: 'Cuisines fetched successfully',
                data,
            });
        } catch (err) {
            next(err);
        }
    }
}
