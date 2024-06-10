import { Context } from "hono";
import { cityService, createCityService, updateCityService,deleteCityService, getCityService  } from "./city.service"


export const getCity = async (c: Context) => {
    try {
        const City = await cityService();
        if (City == null || City.length == 0) {
            return c.text("City not found", 404)
        }        
        return c.json(City, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}



export const createCity = async (c: Context) => {
    try {
        const City = await c.req.json();
        const createdCity= await createCityService(City);


        if (!createdCity) return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the City
        const searchedUser = await getCityService(id);
        if (searchedUser == undefined) return c.text("City not found", 404);
        // get the data and update it
        const res = await updateCityService(id, user);
        // return a success message
        if (!res) return c.text("City not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the city
        const user = await getCityService(id);
        if (user == undefined) return c.text("City not found", 404);
        //deleting the  city
        const res = await deleteCityService(id);
        if (!res) return c.text("City not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}