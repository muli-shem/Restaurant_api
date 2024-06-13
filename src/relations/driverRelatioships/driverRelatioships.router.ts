import { Hono} from "hono";
import { ListDriversWithOrders } from "./driverRelatioships.controller";

export const driverorderRouter = new Hono()


driverorderRouter 
      .get("/driverordersRelationships", ListDriversWithOrders)
      