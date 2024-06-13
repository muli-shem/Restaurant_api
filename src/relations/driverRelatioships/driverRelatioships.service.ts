import { TSDriver, driverTable } from "../../drizzle/schema";
import  db  from "../../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export const getDriverswithOrders = async(): Promise <TSDriver[] | null> =>{
    return await  db.query.driverTable.findMany({
        with:{
            orders:{
                columns:{
                    restaurant_Id: true,
                    estimated_Delivery_Time: true,
                    actual_Delivery_Time: true,
                }
               

            }
        }
    })
}
