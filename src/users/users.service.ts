import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, usersTable } from "../drizzle/schema";

export const usersService = async (limit?: number): Promise<TSUsers[] | null> => {
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
    });
}

export const createUsersService = async (users: TIUsers) => {
    await db.insert(usersTable).values(users);
    return "User created successfully";
}

export const updateUsersService = async (id: number, users: TIUsers) => {
    await db.update(usersTable).set(users).where(eq(usersTable.id, id));
    return "User updated successfully";
}

export const deleteUsersService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return "User deleted successfully";
}

export const getDetailedUsersAddressinfoService = async (id: number) => {
    const users = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        columns: {
            name: true,
            ccontact_Phone: true,
            email: true,
        },
        with: {
            address: {
                columns: {
                    street_Address1: true,
                    street_Address2: true,
                    zip_Code: true,
                    delivery_Instructions: true,
                }
            }
        }
    });
    return users;
}

export const getUserWithCommentsService = async (id: number) => {
    const users = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        columns: {
            name: true,
            ccontact_Phone: true,
            email: true,
        },
        with: {
            comments: {
                columns: {
                    comment_text: true,
                    is_complaint: true,
                    is_price: true,
                }
            }
        }
    });
    return users;
}

export const getUserDetailsWithOrdersService = async (id: number) => {
    const users = await db.query.usersTable.findMany({
        where: eq(usersTable.id, id),
        columns: {
            name: true,
            ccontact_Phone: true,
            email: true,
        },
        with: {
            orders: {
                columns: {
                    estimated_Delivery_Time: true,
                    actual_Delivery_Time: true,
                    price: true,
                    discount: true,
                    final_Price: true,
                }
            }
        }
    });
    return users;
}
