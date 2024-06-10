import { Hono } from "hono";
import { listState, getState, createState, updateState, deleteState } from "./state.controller"
// import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validators";
export const stateRouter = new Hono();
//get all  state      api/users
stateRouter.get("/state", listState);
//get a single state    api/state/1
stateRouter.get("/state/:id", getState)
// create a  state
// userRouter.post("/ state", zValidator('json', StateSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), createState)

stateRouter.post("/state", createState);


//update a  state
stateRouter.put("/state/:id", updateState)

stateRouter.delete("/state/:id", deleteState)

//https:domai.com/api/users?limit=10