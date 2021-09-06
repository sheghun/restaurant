import { CityModel } from '../models/City';

export async function seedCities() {
    const cities = await CityModel.find();

    if (cities.length !== 0) {
        return;
    }

    for (const cityName of ['London', 'New York', 'Lagos', 'Paris', 'California']) {
        cities.push(
            CityModel.create({
                name: cityName,
            }) as any,
        );
    }

    return Promise.all(cities);
}
