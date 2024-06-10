import { Context } from "hono";
import { getOrderStatusService, getOrderStatusByIdService, createOrderStatusService, updateOrderStatusService, deleteOrderStatusService } from "./order_status.service";

// get all order status
export const getOrderStatusController = async (c: Context) => {
    try {
        const order_status = await getOrderStatusService();
        if (order_status == null || order_status.length == 0) {
            return c.text("No order status found", 404);
        }
        return c.json(order_status, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order status by id
export const getOrderStatusByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order_status = await getOrderStatusByIdService(id);
        if (order_status == null) {
            return c.text("Order status not found", 404);
        }
        return c.json(order_status, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create order status
export const createOrderStatusController = async (c: Context) => {
    try {
        const order_status = await c.req.json();
        const neworder_status = await createOrderStatusService(order_status);

        if (!neworder_status) return c.text("Order status not created", 400);
        return c.json({ message: neworder_status }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// update order status
export const updateOrderStatusController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order_status = await c.req.json();

        const updatedorder_status = await getOrderStatusByIdService(id);
        if (!updatedorder_status) return c.text("Order status not found", 404);

        // get data to update
        const res = await updateOrderStatusService(id, order_status);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

// delete order status
export const deleteOrderStatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order_status = await getOrderStatusByIdService(id);
        if (!order_status) return c.text("Order status not found", 404);

        const res = await deleteOrderStatusService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}