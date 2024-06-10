
import { Context } from "hono";
import { getRestaurantsService, getRestaurantByIdService, createRestaurantService, updateRestaurantService, deleteRestaurantService } from "./restaurant.service";

// get all restaurants
export const getRestaurants = async (c: Context) => {
    try {
        const restaurant = await getRestaurantsService();
        if (restaurant == null || restaurant.length == 0) {
            return c.text("No restaurants found", 404);
        }
        return c.json(restaurant, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

// get restaurant by id
export const getRestaurant = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant = await getRestaurantByIdService(id);
        if (restaurant == null) {
            return c.text("Restaurant not found", 404);
        }
        return c.json(restaurant, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

// create restaurant
export const createRestaurant = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const newRestaurant = await createRestaurantService(restaurant);

        if (!newRestaurant) return c.text("Restaurant not created", 400);
        return c.json({ message: newRestaurant }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

//  update restaurant
export const updateRestaurant = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurant = await c.req.json();

        const updatedRestaurant = await getRestaurantByIdService(id);
        if (!updatedRestaurant) return c.text("Restaurant not found", 404);

        // get data to update
        const res = await updateRestaurantService(id, restaurant);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

// delete restaurant
export const deleteRestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        const restaurant = await getRestaurantByIdService(id);
        if (!restaurant) return c.text("Restaurant not found", 404);
        // delete restaurant
        const res = await deleteRestaurantService(id);
      if(!res) return c.text("Restaurant not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}