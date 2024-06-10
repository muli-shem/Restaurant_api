import { Context } from "hono";
import { getOrderMenuItemsService, getOrderMenuItemByIdService, createOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService } from "./order_menu_item.service";

// get all order menu items
export const getOrderMenuItemsController = async (c: Context) => {
    try {
        const order_menu_item = await getOrderMenuItemsService();
        if (order_menu_item == null || order_menu_item.length == 0) {
            return c.text("No order menu items found", 404);
        }
        return c.json(order_menu_item, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order menu item by id
export const getOrderMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order_menu_item = await getOrderMenuItemByIdService(id);
        if (order_menu_item == null) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(order_menu_item, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


// create order menu item
export const createOrderMenuItemController = async (c: Context) => {
    try {
        const order_menu_item= await c.req.json();
        const neworder_menu_item = await createOrderMenuItemService(order_menu_item);

        if (!neworder_menu_item) return c.text("Order menu item not created", 400);
        return c.json({ message: neworder_menu_item }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order menu item
export const updateOrderMenuItemController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order_menu_item = await c.req.json();

        const updatedorder_menu_item = await getOrderMenuItemByIdService(id);
        if (!updatedorder_menu_item) return c.text("Order menu item not found", 404);

        // get data to update
        const res = await updateOrderMenuItemService(id, order_menu_item);
        if (!res) return c.text("Order menu item not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete order menu item
export const deleteOrderMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const order_menu_item = await getOrderMenuItemByIdService(id);
        if (!order_menu_item) return c.text("Order menu item not found", 404);

        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("Order menu item not deleted", 400);
        return c.json({ message: res }, 200);

    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};