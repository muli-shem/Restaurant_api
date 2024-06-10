import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, usersTable } from "../drizzle/schema";

export const usersService = async (limit? : number):Promise<TSUsers[] | null> =>{
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit
        });
    }
    return await db.query.usersTable.findMany();
}
export const getUsersByIdService = async (id: number): Promise<TIUsers | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

export const createUsersService = async (users: TIUsers) => {
    await db.insert(usersTable).values(users)
    return "user created successfully";
}


export const updateUsersService = async (id: number, users: TIUsers) => {
    await db.update(usersTable).set(users).where(eq(usersTable.id, id))
    return "user updated successfully";
}
export const deleteUsersService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "user  deleted successfully";
}
