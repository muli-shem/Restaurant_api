import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIOrders, TSOrders, ordersTable } from "../drizzle/schema";

// GET ALL ORDERS
export const getOrdersService = async (): Promise<TSOrders[] | null> => {
    const orders = await db.query.ordersTable.findMany();
    return orders;
}

// GET ORDER BY ID
export const getOrderByIdService = async (id: number): Promise<TSOrders | undefined> => {
    const order = await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id)
    });
    return order;
}

// CREATE ORDE
export const createOrderService = async (order: TIOrders) => {
    await db.insert(ordersTable).values(order)
    return "order created successfully";
}

//  UPDATE ORDER
export const updateOrderService = async (id: number, order: TIOrders) => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.id, id));
    return "order updated successfully";
}

// DELETE ORDER
export const deleteOrderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id));
    return "order deleted successfully";
}
// get orders details
export const getOrderDetailsService = async(id:number)=>{
    const orderDetails = await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id),
        columns:{
            price:true,
            discount:true,
            final_Price:true,
            comment:true,
        },
        with:{
            restaurant:{
                columns:{
                    name:true,
                    street_address:true,
                    zip_code:true,
                },
                with:{
                    city:{
                        columns:{
                            name:true,
                            
                        }
                    }
                }
                  
            }
        }              

    })
}