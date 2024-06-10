import { Hono } from 'hono'
import { getMenuItemsController, getMenuItemByIdController, createMenuItemController, updateMenuItemController, deleteMenuItemController } from './menu_item.controller';
import { zValidator } from '@hono/zod-validator';
import { menuItemsSchema } from "../validator";

export const menuRouter = new Hono()

// get all menu items
menuRouter
    .get("menu_item", getMenuItemsController)
    .post("menu_item", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createMenuItemController)

// get menu item by id
menuRouter
    .get("menu_item/:id", getMenuItemByIdController)
    .put("menu_item/:id", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateMenuItemController)
    .delete("menu_item/:id", deleteMenuItemController)