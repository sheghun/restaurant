import {Document, model, Schema} from 'mongoose';

export interface Cuisine extends Document {
    name: string;
}

const cuisineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export const CuisineModel = model<Cuisine>('Cuisine', cuisineSchema);
