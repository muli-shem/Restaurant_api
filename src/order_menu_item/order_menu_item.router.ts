
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { orderItemsSchema } from "../validator";
import { getOrderMenuItemsController, getOrderMenuItemByIdController, createOrderMenuItemController, updateOrderMenuItemController, deleteOrderMenuItemController } from './order_menu_item.controller';

export const order_menu_itemRouter = new Hono()

// get all order menu items
order_menu_itemRouter
    .get("order_menu_item", getOrderMenuItemsController)
    .post("order_menu_item", zValidator('json', orderItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createOrderMenuItemController)

// get order menu item by id
order_menu_itemRouter
    .get("order_menu_item/:id", getOrderMenuItemByIdController)
    .put("order_menu_item/:id", zValidator('json', orderItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateOrderMenuItemController)
    .delete("order_menu_item/:id", deleteOrderMenuItemController)
