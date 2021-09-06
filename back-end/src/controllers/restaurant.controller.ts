import { NextFunction, Request, Response } from 'express';
import { RestaurantModel } from '../models/Restaurant';

export class RestaurantController {
    private static restaurantModel = RestaurantModel;

    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RestaurantModel.find().populate('city');
            return res.status(200).json({
                message: 'Restaurants fetched successfully',
                data,
            });
        } catch (err) {
            next(err);
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { cuisine, city } = req.query as any;

            const data = await RestaurantModel.find({ cuisines: cuisine, city });
            return res.status(200).json({
                message: 'Restaurants searched successfully',
                data,
            });
        } catch (err) {
            next(err);
        }
    }
}
