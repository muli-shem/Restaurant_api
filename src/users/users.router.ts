import { Hono } from "hono";
import { listUsers, getUsers, createUsers, updateUsers, deleteUsers } from "./users.controller";
import { adminRoleAuth,bothRoleAuth,userRoleAuth } from "../middleware/bear.auth";
import { zValidator } from "@hono/zod-validator";
import {usersSchema} from "../validator"
import { json } from "stream/consumers";
export const usersRouter = new Hono();

// Get all users at api/users
usersRouter
.get("/users",adminRoleAuth, listUsers)
.post("/users", zValidator('json',usersSchema,(results,c) =>{
    if(!results.success){
        return c.json(results.error,400)
    }
}), createUsers);
// Get a single user by ID at api/users/:id
usersRouter.get("/users/:id",bothRoleAuth,getUsers)
.put("/users/:id", zValidator('json',usersSchema, (results,c)=>{
    if(!results.success){
        return c.json(results.error,400)
    }
}), updateUsers)
.delete("/users/:id", adminRoleAuth, deleteUsers);



