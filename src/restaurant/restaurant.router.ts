import { Hono } from "hono";
import { type Context } from "hono";

import { getRestaurant, getRestaurants,  createRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import { get } from "http";

export const restaurantRouter = new Hono();

//get all Restaurant

restaurantRouter.get("/restaurant", getRestaurants);

//get single restaurant

restaurantRouter.get("/restaurant/:id", getRestaurant);

// create a  restaurant

restaurantRouter.post("/restaurant", createRestaurant);

// update a restaurant

restaurantRouter.put("/restaurant/:id", updateRestaurant);

//delete a restaurant

restaurantRouter.delete("/restaurant/:id", deleteRestaurant);