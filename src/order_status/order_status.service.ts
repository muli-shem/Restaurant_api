import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIOrderStatus, TSOrderStatus, orderStatusTable } from "../drizzle/schema";

// GET ALL ORDERSTATUS
export const getOrderStatusService = async (): Promise<TSOrderStatus[] | null> => {
    const order_status = await db.query.orderStatusTable.findMany();
    return order_status;
};

// GET ORDERSTATUS BY ID
export const getOrderStatusByIdService = async (id: number): Promise<TSOrderStatus | undefined> => {
    const order_status = await db.query.orderStatusTable.findFirst({
        where: eq(orderStatusTable.id, id)
    });
    return order_status;
}

// CREATE ORDERSTATUS   
export const createOrderStatusService = async (order_status: TIOrderStatus) => {
    await db.insert(orderStatusTable).values(order_status)
    return "orderStatus created successfully";
}

//  UPDATE ORDERSTATUS
export const updateOrderStatusService = async (id: number, order_status: TIOrderStatus) => {
    await db.update(orderStatusTable).set(order_status).where(eq(orderStatusTable.id, id));
    return "orderStatus updated successfully";
}

// DELETE ORDERSTATUS
export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id));
    return "orderStatus deleted successfully";
}