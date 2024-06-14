import { Hono } from 'hono'
import { getAddresCityDetaliedInformController,getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./address.controller";
import { addressSchema } from '../validator';
import { zValidator } from '@hono/zod-validator';
import { getAddresCityDetaliedInform, getAddressesService } from './address.service';
import { getActiveResourcesInfo } from 'process';

export const addressRouter = new Hono()
addressRouter.get("address/details", getAddresCityDetaliedInformController);
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