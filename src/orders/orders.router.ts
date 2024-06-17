
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getOrdersController, getOrderByIdController, createOrderController, updateOrderController, deleteOrderController, getDetailedOrdersInfo } from './orders.controller';
import { orderSchema } from "../validator";
import { bothRoleAuth } from '../middleware/bear.auth';
import { getOrderDetailsService } from './orders.service';
//import { adminRoleAuth,bothRoleAuth,userRoleAuth } from "../middleware/bear.auth";

export const ordersRouter = new Hono()

// get all orders
ordersRouter
    .get("orders",  getOrdersController)
    .post("orders", zValidator('json', orderSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createOrderController)

// get order by id
ordersRouter
    .get("orders/:id", getOrderByIdController)
    .put("orders/:id", zValidator('json', orderSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateOrderController)
    .delete("orders/:id", deleteOrderController)

ordersRouter.get("orders/:id/details" , bothRoleAuth, getDetailedOrdersInfo)
     
