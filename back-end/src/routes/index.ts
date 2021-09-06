import { Router } from 'express';
import { CityController } from '../controllers/city.controller';
import { CuisineController } from '../controllers/cuisine.controller';
import { RestaurantController } from '..//controllers/restaurant.controller';

// Init router and path
const router = Router();

router.get('/cities', CityController.findAll);
router.get('/cuisines', CuisineController.findAll);
router.get('/restaurants', RestaurantController.findAll);
router.get('/restaurants/search', RestaurantController.search);

// Export the base-router
export default router;
