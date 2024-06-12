import { pgTable } from 'drizzle-orm/pg-core';
import { z } from 'zod';

// state
export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
})
//address
export const addressSchema = z.object({
    street_Address1: z.string(),
    street_Address2: z.string(),
    city_Id: z.number(),
    zip_Code: z.string(),
    delivery_Instructions: z.string(),
    user_Id: z.number(),
});


//status catalog

export const status_catalogSchema =z.object({
   
    name: z.string(),

});


//category 
export const categorySchema = z.object({
    name: z.string(),
});

//Driver

export const driverSchema = z.object({
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.string(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean(),
});

//Order

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

//orderStatus

export const orderStatusSchema = z.object({
    orderId: z.number(),
    statusCatalogId: z.number()
});

//Comments

export const commentsSchema = z.object({
    order_id: z.number(),
    user_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_price: z.boolean()
});

// MenuItems

export const menuItemsSchema = z.object({
    name: z.string(),
    restaurantId: z.number(),
    categoryId: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean()
});

//RrstaurantOwner

export const restaurantOwnerSchema = z.object({
    restaurantId: z.number(),
    ownerId: z.number()
});

//OrderItems

export const orderItemsSchema =z.object({
    order_Id: z.number(),
    menuItem_Id: z.number(),
    quantity: z.number(),
    itemPrice: z.number(),
    price: z.number(),
    comment: z.string()
})
//user

export const usersSchema =z.object({
    name: z.string(),
    ccontact_Phone: z.number(),
    phone_Verified:z.boolean(),
    email: z.string(),
    email_Verified:z.boolean(),
    confirmation_Code:z.number(),
    password:z.string()

})

//restaurant
export const restaurantSchema = z.object({
    name:z.string(),
    street_address:z.string(),
    zip_code:z.number(),
    city_id: z.number()
})

// authentications
     //user

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
})
export const registerUserSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    role: z.string().optional(
        
    ),
})