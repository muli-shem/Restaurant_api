import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIstatus_catalog, TSstatus_catalog, statusCatalogTable } from "../drizzle/schema";

// GET ALL STATUS CATALOG
export const getStatusCatalogService = async (): Promise<TSstatus_catalog[] | null> => {
    const status_catalog = await db.query.statusCatalogTable.findMany();
    return status_catalog;
};

// GET STATUS CATALOG BY ID
export const getStatusCatalogByIdService = async (id: number): Promise<TSstatus_catalog | undefined> => {
    const status_catalog = await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.id, id)
    });
    return status_catalog;
}

// CREATE STATUS CATALOG
export const createStatusCatalogService = async (status_catalog: TIstatus_catalog) => {
    await db.insert(statusCatalogTable).values(status_catalog)
    return "statusCatalog created successfully";
}

//  UPDATE STATUS CATALOG
export const updateStatusCatalogService = async (id: number,status_catalog: TIstatus_catalog) => {
    await db.update(statusCatalogTable).set(status_catalog).where(eq(statusCatalogTable.id, id));
    return "statusCatalog updated successfully";
}

// DELETE STATUS CATALOG
export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id));
    return "statusCatalog deleted successfully";
}