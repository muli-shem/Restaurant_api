import { Hono } from "hono";
import { type Context } from "hono";

import { getRestaurant, getRestaurants,  createRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import { get } from "http";
import {restaurantSchema} from "../validator";
import { zValidator } from "@hono/zod-validator";
import { json } from "stream/consumers";

export const restaurantRouter = new Hono();

//get all Restaurant

restaurantRouter.get("/restaurant", getRestaurants)
                .post("/restaurant", zValidator('json', restaurantSchema, (result, c)=>{
                    if(!result.success){
                        return c.json(result.error,400);

                    }
                }), createRestaurant)
//get single restaurant

restaurantRouter.get("/restaurant/:id", getRestaurant)
                .put("/restaurant/:id", zValidator('json', restaurantSchema,(result, c)=>{
                    if(!result.success){
                        return c.json(result.error,400);

                    }
                }), updateRestaurant)
                
.delete("/restaurant/:id", deleteRestaurant);