import { seedCities } from './city.seeder';
import { seedCuisines } from './cuisine.seeder';
import { seedRestaurants } from './restaurant.seeder';

export async function runSeed() {
    await seedCuisines();
    await seedCities();
    await seedRestaurants();
}
