import { Context } from "hono";
import { StateService, getStateByIdService, createStateService, getStateDetailsService,  updateStateService, deleteStateService } from "./state.service";

export const listState = async (c: Context) => {
    try {
        //limit the number of states to be returned

        const limit = Number(c.req.query('limit'))

        const data = await StateService(limit);
        if (data == null || data.length == 0) {
            return c.text("state not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const getState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getStateByIdService(id);
    if (user == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(user, 200);
}

export const createState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createStateService(state);


        if (!createdState) return c.text("User not created", 404);
        return c.json({ msg: createdState }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await getStateByIdService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateStateService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getStateByIdService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteStateService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//get state details

export const getDetailedStateInfo = async(c:Context)=>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)) return c.text("Invalid ",400);
        const state = await getStateDetailsService(id);
        if(state == null){
            return c.text("No state  Found", 400)
        }
        return c.json(state, 200);
    }catch (error:any){
        return c.json({error:error?.message}, 400);
    }
}