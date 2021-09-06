import { NextFunction, Request, Response } from 'express';
import { CityModel } from '../models/City';

export class CityController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const cities = await CityModel.find();

            return res.status(200).json({
                message: 'Cities fetched successfully',
                data: cities,
            });
        } catch (err) {
            next(err);
        }
    }
}
