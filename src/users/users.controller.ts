import { Context } from "hono";
import { usersService, getUsersByIdService, createUsersService, updateUsersService, deleteUsersService } from "./users.service";

export const listUsers = async (c: Context) => {
    try {
        //limit the number of Users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("Users not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const getUsers = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUsersByIdService(id);
    if (user == undefined) {
        return c.text("Users not found", 404);
    }
    return c.json(user, 200);
}

export const createUsers = async (c: Context) => {
    try {
        const users = await c.req.json();
        const createdUsers= await createUsersService(users);


        if (!createdUsers) return c.text("User not created", 404);
        return c.json({ msg: createdUsers }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateUsers = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await getUsersByIdService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUsersService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteUsers = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getUsersByIdService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUsersService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}