import { Hono } from "hono";
import { listUsers, getUsers, createUsers, updateUsers, deleteUsers } from "./users.controller";

export const usersRouter = new Hono();

// Get all users at api/users
usersRouter.get("/users", listUsers);

// Get a single user by ID at api/users/:id
usersRouter.get("/users/:id", getUsers);

// Create a new user at api/users
usersRouter.post("/users", createUsers);

// Update an existing user by ID at api/users/:id
usersRouter.put("/users/:id", updateUsers);

// Delete a user by ID at api/users/:id
usersRouter.delete("/users/:id", deleteUsers);
