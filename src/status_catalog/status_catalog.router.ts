import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getStatusCatalogController, getStatusCatalogByIdController, createStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController } from './status_catalog.controller';
import { status_catalogSchema } from "../validator";

export const status_catalogRouter = new Hono()

// get all status_catalog
status_catalogRouter
    .get("status_catalog", getStatusCatalogController)
    .post("status_catalog", zValidator('json', status_catalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createStatusCatalogController)

// get status_catalog by id
status_catalogRouter
    .get("status_catalog/:id", getStatusCatalogByIdController)
    .put("status_catalog/:id", zValidator('json', status_catalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateStatusCatalogController)
    .delete("status_catalog/:id", deleteStatusCatalogController)