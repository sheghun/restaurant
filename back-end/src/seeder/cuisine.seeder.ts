import { CuisineModel } from '../models/Cuisine';

export async function seedCuisines() {
    const cuisines = await CuisineModel.find();
    if (cuisines.length !== 0) {
        return;
    }
    return Promise.all(
        ['African', 'American', 'Italian', 'Indian', 'Chinese', 'Russian'].map(cuisineName =>
            CuisineModel.create({ name: cuisineName }),
        ),
    );
}
