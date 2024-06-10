import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getOrderStatusController, getOrderStatusByIdController, createOrderStatusController, updateOrderStatusController, deleteOrderStatusController } from './order_status.controller';
import { orderStatusSchema } from "../validator";

export const orderStatusRouter = new Hono()

// get all order status
orderStatusRouter
    .get("order_status", getOrderStatusController)
    .post("order_status", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createOrderStatusController)

// get order status by id
orderStatusRouter
    .get("order_status/:id", getOrderStatusByIdController)
    .put("order_status/:id", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateOrderStatusController)
    .delete("order_status/:id", deleteOrderStatusController)