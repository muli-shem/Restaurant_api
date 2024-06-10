import { z } from 'zod';
export const addressSchema = z.object({
    street_Address1: z.string(),
    street_Address2: z.string(),
    city_Id: z.number(),
    zip_Code: z.string(),
    delivery_Instructions: z.string(),
    user_Id: z.number(),
});

export const status_catalogSchema =z.object({
   
    name: z.string(),

});

export const categorySchema = z.object({
    name: z.string(),
});

export const driverSchema = z.object({
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.string(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean(),
   
    
});
export const orderSchema = z.object({
    restaurant_Id: z.number(),
    delivery_Address_Id: z.number(),
    user_Id: z.number(),
    driver_Id: z.number(),
    price: z.number(),
    discount: z.number(),
    final_Price: z.number(),
    comment: z.string(),
});
export const orderStatusSchema = z.object({
    orderId: z.number(),
    statusCatalogId: z.number()
});
export const commentsSchema = z.object({
    order_id: z.number(),
    user_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_price: z.boolean()
});

export const menuItemsSchema = z.object({
    name: z.string(),
    restaurantId: z.number(),
    categoryId: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean()
});

export const restaurantOwnerSchema = z.object({
    restaurantId: z.number(),
    ownerId: z.number()
});

export const orderItemsSchema =z.object({
    
})
