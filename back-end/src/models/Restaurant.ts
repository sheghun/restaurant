import { Document, model, Schema } from 'mongoose';
import { City } from './City';

export interface Restaurant extends Document {
    name: string;
    city: string | City;
    cuisines: string[];
    averageCost: number;
}

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
    },
    cuisines: {
        type: [String],
    },
    averageCost: {
        type: Number,
        required: true,
    },
});

export const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);
