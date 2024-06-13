import { Context} from "hono";
import{getDriverswithOrders} from "./driverRelatioships.service";

export const ListDriversWithOrders = async(c:Context)=>{
    const data = await getDriverswithOrders();
    if (data == null){
        return c.text("Address not found", 400);
    }
    return c.json(data,200);
}