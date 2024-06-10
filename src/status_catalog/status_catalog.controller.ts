
import { Context } from "hono";
import { getStatusCatalogService, getStatusCatalogByIdService, createStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService } from "./status_catalog.service";

// get all status catalog
export const getStatusCatalogController = async (c: Context) => {
    try {
        const status_catalog = await getStatusCatalogService();
        if (status_catalog == null || status_catalog.length == 0) {
            return c.text("No status_catalog found", 404);
        }
        return c.json(status_catalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get status catalog by id
export const getStatusCatalogByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const status_catalog = await getStatusCatalogByIdService(id);
        if (status_catalog == null) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(status_catalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create status catalog    
export const createStatusCatalogController = async (c: Context) => {
    try {
        const status_catalog = await c.req.json();
        const newstatus_catalog = await createStatusCatalogService(status_catalog);

        if (!newstatus_catalog) return c.text("Status catalog not created", 400);
        return c.json({ message: newstatus_catalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// update status catalog
export const updateStatusCatalogController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const status_catalog= await c.req.json();

        const updatedstatus_catalog = await getStatusCatalogByIdService(id);
        if (!updatedstatus_catalog) return c.text("Status catalog not found", 404);

        // get data to update
        const res = await updateStatusCatalogService(id, status_catalog);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete status catalog
export const deleteStatusCatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const status_catalog = await getStatusCatalogByIdService(id);
        if (!status_catalog) return c.text("Status catalog not found", 404);

        const res = await deleteStatusCatalogService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
