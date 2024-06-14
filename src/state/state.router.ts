import { Hono } from "hono";
import { listState, getState, createState, updateState, deleteState } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";
import { adminRoleAuth } from "../middleware/bear.auth";
//import { adminRoleAuth,bothRoleAuth,userRoleAuth } from "../middleware/bear.auth";

export const stateRouter = new Hono();
//get all  state      api/users
stateRouter

.get("/state", listState)
.post("/state",zValidator('json',stateSchema, (results,c)=>{
    if (!results.success){
        return c.json(results.error,400)
        }
    }), createState)
//get a single state    api/state/1
stateRouter
.get("/state/:id", getState)
.put ("/state/:id", zValidator('json',stateSchema, (result,c)=>{
    if(!result.success){
        return c.json(result.error, 400)

    }
}), updateState)
.delete("/state/:id", deleteState)


//https:domai.com/api/users?limit=10