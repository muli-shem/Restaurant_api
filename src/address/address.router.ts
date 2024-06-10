import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./address.controller";
import { addressSchema } from '../validator';
import { zValidator } from '@hono/zod-validator';

export const addressRouter = new Hono()

// get all addresses
addressRouter.get("address", getAddressesController)
    .post("address", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createAddressController)

// get address by id
addressRouter
    .get("address/:id", getAddressByIdController)
    .put("address/:id", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateAddressController)
    .delete("address/:id", deleteAddressController)