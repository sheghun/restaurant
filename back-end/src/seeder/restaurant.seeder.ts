import faker from 'faker';
import { CityModel } from '../models/City';
import { CuisineModel } from '../models/Cuisine';
import { RestaurantModel } from '../models/Restaurant';

export async function seedRestaurants() {
    const restaurants = await RestaurantModel.find();
    if (restaurants.length !== 0) {
        return;
    }
    const cities = await CityModel.find().exec();
    const cuisines = await CuisineModel.find().then(cuisines =>
        cuisines.map(cuisine => cuisine.name),
    );

    console.log(cities);

    for (const city of cities) {
        console.log(city);
        for (let i = 1; i <= 40; i++) {
            restaurants.push(
                RestaurantModel.create({
                    city: city._id,
                    name: faker.company.companyName(),
                    averageCost: faker.commerce.price(),
                    cuisines: [
                        cuisines[Math.floor(Math.random() * cuisines.length)],
                        cuisines[Math.floor(Math.random() * cuisines.length)],
                        cuisines[Math.floor(Math.random() * cuisines.length)],
                        cuisines[Math.floor(Math.random() * cuisines.length)],
                    ].filter((cuisine, index, array) => array.indexOf(cuisine) === index), // Filter cuisines with duplicate
                }) as any,
            );
        }
    }
    return await Promise.all(restaurants);
}
