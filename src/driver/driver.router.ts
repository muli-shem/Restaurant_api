import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getDriversController, getDriverByIdController, createDriverController, updateDriverController, deleteDriverController } from './driver.controller';
import { driverSchema } from "../validator";

export const driverRouter = new Hono()

// get all drivers
driverRouter
    .get("driver", getDriversController)
    .post("driver", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createDriverController)

// get driver by id

driverRouter
    .get("driver/:id", getDriverByIdController)
    .put("driver/:id", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), 
    updateDriverController)
    .delete("driver/:id", deleteDriverController)