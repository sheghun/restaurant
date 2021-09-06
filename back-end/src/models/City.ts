import {Document, model, Schema} from 'mongoose';

export interface City extends Document {
    name: string;
}

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export const CityModel = model<City>('City', citySchema);
