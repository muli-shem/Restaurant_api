import { Hono } from 'hono'
import { getRestaurantOwnersController, getRestaurantOwnerByIdController, createRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController } from './restaurant_owner.controller';
import { zValidator } from '@hono/zod-validator';
import { restaurantOwnerSchema } from "../validator";

export const restaurantOwnerRouter = new Hono()

// get all restaurantOwners
restaurantOwnerRouter
    .get("restaurant_owner", getRestaurantOwnersController)
    .post("restaurant_owner", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createRestaurantOwnerController)

// get restaurantOwner by id
restaurantOwnerRouter
    .get("restaurant_owner/:id", getRestaurantOwnerByIdController)
    .put("restaurant_owner/:id", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateRestaurantOwnerController)
    .delete("restaurant_owner/:id", deleteRestaurantOwnerController)