import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIRestaurantOwner, TSRestaurantOwner, restaurantOwnerTable } from "../drizzle/schema";

// GET ALL RESTAURANTOWNERS
export const getRestaurantOwnersService = async (): Promise<TSRestaurantOwner[] | null> => {
    const restaurant_owner = await db.query.restaurantOwnerTable.findMany();
    return restaurant_owner;
};

// GET RESTAURANTOWNER BY ID
export const getRestaurantOwnerByIdService = async (id: number): Promise<TSRestaurantOwner | undefined> => {
    const restaurant_owner = await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.id, id)
    });
    return restaurant_owner;
}

// CREATE RESTAURANTOWNER
export const createRestaurantOwnerService = async (restaurant_owner: TIRestaurantOwner) => {
    await db.insert(restaurantOwnerTable).values(restaurant_owner)
    return "restaurantOwner created successfully";
}

//  UPDATE RESTAURANTOWNER
export const updateRestaurantOwnerService = async (id: number, restaurant_owner: TIRestaurantOwner) => {
    await db.update(restaurantOwnerTable).set(restaurant_owner).where(eq(restaurantOwnerTable.id, id));
    return "restaurantOwner updated successfully";
}

// DELETE RESTAURANTOWNER
export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id));
    return "restaurantOwner deleted successfully";
}