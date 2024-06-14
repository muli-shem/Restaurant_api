import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getDriversController, getDriverByIdController, createDriverController, updateDriverController, deleteDriverController } from './driver.controller';
import { driverSchema } from "../validator";
import { adminRoleAuth } from '../middleware/bear.auth';

export const driverRouter = new Hono()

// get all drivers
driverRouter
    .get("driver",adminRoleAuth, getDriversController)
    .post("driver", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createDriverController)

// get driver by id

driverRouter
    .get("driver/:id", adminRoleAuth, getDriverByIdController)
    .put("driver/:id", adminRoleAuth, zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), 
    updateDriverController)
    .delete("driver/:id",adminRoleAuth, deleteDriverController)