import { eq } from "drizzle-orm";
import db from "../drizzle/db";


import { TIMenuItem, TSMenuItem, menuItemTable } from "../drizzle/schema";

// GET ALL MENU ITEMS
export const getMenuItemsService = async (): Promise<TSMenuItem[] | null> => {
    const menu_items = await db.query.menuItemTable.findMany();
    return menu_items;
};

// GET MENU ITEM BY ID
export const getMenuItemByIdService = async (id: number): Promise<TSMenuItem | undefined> => {
    const menu_item = await db.query.menuItemTable.findFirst({
        where: eq(menuItemTable.id, id)
    });
    return menu_item;
}

// CREATE MENU ITEM
export const createMenuItemService = async (menu_item: TIMenuItem) => {
    await db.insert(menuItemTable).values(menu_item)
    return "Menu item created successfully";
}

//  UPDATE MENU ITEM
export const updateMenuItemService = async (id: number, menu_item: TIMenuItem) => {
    await db.update(menuItemTable).set(menu_item).where(eq(menuItemTable.id, id));
    return "menu item updated successfully";
}

// DELETE MENU ITEM
export const deleteMenuItemService = async (id: number) => {
    await db.delete(menuItemTable).where(eq(menuItemTable.id, id));
    return "menu item deleted successfully";
}