import { Hono } from "hono";
import { getCity,  createCity, updateCity, deleteCity } from "./city.controller";

export const cityRouter = new Hono();

cityRouter.get("/City", getCity);
cityRouter.get("/City/:id", getCity)

//get all  state      api/city
// cityRouter.get("/state", listCity);

//get a single state    api/state/1

// create a  state
// userRouter.post("/ state", zValidator('json', StateSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), createState)

cityRouter.post("/City", createCity);


//update a  state
cityRouter.put("/City/:id", updateCity)

cityRouter.delete("/City/:id", deleteCity)

//https:domai.com/api/users?limit=10