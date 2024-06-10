import { Context } from "hono";

import { createRestaurantOwnerService, deleteRestaurantOwnerService, getRestaurantOwnerByIdService, getRestaurantOwnersService, updateRestaurantOwnerService } from "./restaurant_owner.service";

// get all restaurant_owner
export const getRestaurantOwnersController = async (c: Context) => {
    try {
        const restaurant_owner = await getRestaurantOwnersService();
        if (restaurant_owner == null || restaurant_owner.length == 0) {
            return c.text("No orders found", 404);
        }
        return c.json(restaurant_owner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get restaurant_owner by id
export const getRestaurantOwnerByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant_owner = await getRestaurantOwnerByIdService(id);
        if (restaurant_owner == null) {
            return c.text("Order not found", 404);
        }
        return c.json(restaurant_owner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create restaurant_owner
export const createRestaurantOwnerController = async (c: Context) => {

    try {
        const order = await c.req.json();
     
        const newrestaurant_owner = await createRestaurantOwnerService(order);

        if (!newrestaurant_owner) return c.text("Order not created", 400);
        return c.json({ message: newrestaurant_owner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update restaurant_owner
export const updateRestaurantOwnerController = async (c: Context) => {

    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order = await c.req.json();
        
        const updatedrestaurant_owner = await getRestaurantOwnerByIdService(id);
        if (!updatedrestaurant_owner) return c.text("Order not found", 404);

        // get data to update
        const res = await updateRestaurantOwnerService(id, order);
        if (!res) return c.text("Order not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete restaurant_owner
export const deleteRestaurantOwnerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const restaurant_owner = await getRestaurantOwnerByIdService(id);
        if (!restaurant_owner) return c.text("Order not found", 404);

        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("Order not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};