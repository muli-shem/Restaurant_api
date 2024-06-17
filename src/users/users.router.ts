import { Hono } from "hono";
import { 
  listUsers, 
  getUsers, 
  createUsers, 
  updateUsers, 
  deleteUsers, 
  getDetailedUsersAddressinfo, 
  getUserDetailsWithOrders, 
  getUserWithComments 
} from "./users.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bear.auth";
import { zValidator } from "@hono/zod-validator";
import { usersSchema } from "../validator";

export const usersRouter = new Hono();

usersRouter
  .get("/users", adminRoleAuth, listUsers)
  .post("/users", zValidator('json', usersSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }), createUsers)
  .get("/users/:id", bothRoleAuth, getUsers)
  .put("/users/:id", zValidator('json', usersSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }), updateUsers)
  .delete("/users/:id", adminRoleAuth, deleteUsers)
  .get("/users/:id/address", bothRoleAuth, getDetailedUsersAddressinfo)
  .get("/users/:id/comment", adminRoleAuth, getUserWithComments)
  .get("/users/:id/orders", bothRoleAuth, getUserDetailsWithOrders);
