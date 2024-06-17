
import { pgTable, serial, text, varchar,boolean,integer,timestamp,decimal, pgEnum } from "drizzle-orm/pg-core";
import {relations}from"drizzle-orm";
import {sql} from "drizzle-orm"
import { One } from "drizzle-orm";
import { Many } from "drizzle-orm";
import { setUncaughtExceptionCaptureCallback } from "process";
//state tabel
export const StateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar ("name", {length:255}).notNull(),
    code: varchar("code").notNull(),
    
});           
// / city table

export const cityTable =pgTable("City",{
    id: serial("id").primaryKey(),
    name: varchar ("name",{length:255}).notNull(),
    state_Id: integer("state_Id").notNull().references(() => StateTable.id, {onDelete:"cascade"})

});
// users table

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name",{length:255}).notNull(),
    ccontact_Phone: varchar("ccontact_Phone").notNull(),
    phone_Verified: boolean("phone_Verified").notNull(),
    email: varchar("email").notNull(),
    email_Verified: boolean("email_Verified").notNull(),
    confirmation_Code: varchar("confirmation_Code").notNull(),
    password: varchar("password").notNull(),
    created_At: timestamp("created_At").default(sql`NOW()`).notNull(),
    updated_At: timestamp("updated_At").default(sql`NOW()`).notNull()
});


//Address table
export const addressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    street_Address1: varchar("street_Address1").notNull(),
    street_Address2: varchar("street_Address2").notNull(),
    zip_Code: varchar("zip_Code").notNull(),
    delivery_Instructions: text("delivery_Instructions").notNull(),
    user_Id: integer("user_Id").notNull().references(() => usersTable.id,  {onDelete:"cascade"}),
    city_Id: integer("city_Id").notNull().references(() => cityTable.id,  {onDelete:"cascade"}),
    created_At: timestamp("created_At").default(sql`NOW()`).notNull(),
    updated_At: timestamp("updated_At").default(sql`NOW()`).notNull()
});

// category table

export const categoryTable = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull()
});

// Restaurant table
export const restaurantTable =pgTable("restaurant",{
    id: serial("id").primaryKey(),
    name: varchar("name", {length:255}).notNull(),
    street_address: varchar("street_address",{length:255}).notNull(),
    zip_code: varchar("zip_code", {length:255}).notNull(),
    city_id: integer("city_id").notNull().references(()=>cityTable.id, {onDelete:"cascade"}),
    created_At: timestamp("created_At").default(sql`NOW()`).notNull(),
    updated_At: timestamp("updated_At").default(sql`NOW()`).notNull()

});
;

// menuItem
export const menuItemTable = pgTable("menu_item", {
    id: serial("serial").primaryKey(),
    name: varchar("name").notNull(),
    restaurantId: integer("restaurant").notNull().references(() => restaurantTable.id, {onDelete:"cascade"}),
    categoryId: integer("category_id").notNull().references(() => categoryTable.id,  {onDelete:"cascade"}),
    description: text("description"),
    ingredients: text("ingredients"),
    price: decimal("decimal").notNull(),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("createdAT").default(sql`NOW()`).notNull(),
    updatedAt: timestamp("createdAy").default(sql`NOW()`).notNull()
});



//comment table

export const commentTable = pgTable("comment",{
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=>ordersTable.id,  {onDelete:"cascade"}),
    user_id: integer("user_id").notNull().references(()=>usersTable.id,  {onDelete:"cascade"}),
    comment_text: varchar("comment_text").notNull(),
    is_complaint: boolean("is_compliment").notNull(),
    is_price: boolean("is_price").notNull(),
    createdAt: timestamp("createdAT").default(sql`NOW()`).notNull(),
    updatedAt: timestamp("updatedAT").default(sql`NOW()`).notNull()

});

// Comment belongs to a User
export const commentUserRelations = relations(commentTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [commentTable.user_id],
        references: [usersTable.id]
    })

}));


// Driver table

export const driverTable = pgTable("driver",{
    id: serial("id").primaryKey(),
    car_make: varchar("car_make", {length:245}).notNull(),
    car_model: varchar("car_model",{length:245}).notNull(),
    car_year: varchar("car_year").notNull(),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    user_id: integer("user_id").notNull().references(()=>usersTable.id,  {onDelete:"cascade"}),
    created_At: timestamp("created_At").default(sql`NOW()`).notNull(),
    updated_At: timestamp("updated_At").default(sql`NOW()`).notNull()
});
// Order table

export const ordersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurant_Id: integer("restaurant_id").notNull().references(() => restaurantTable.id,  {onDelete:"cascade"}),
    estimated_Delivery_Time: timestamp("estimated_Delivery_Time").default(sql`NOW()`).notNull(),
    actual_Delivery_Time:timestamp("actual_Delivery_Time").default(sql`NOW()`).notNull(),
    delivery_Address_Id: integer("delivery_Address_Id").notNull().references(() => addressTable.id, {onDelete:"cascade"}),
    user_Id: integer("user_id").notNull().references(() => usersTable.id,  {onDelete:"cascade"}),
    driver_Id: integer("dreiver_id").references(() => driverTable.id,  {onDelete:"cascade"}),
    price: decimal("price").notNull(),
    discount: decimal("discount"),
    final_Price: decimal("final"),
    comment: text("comment"),
    created_At: timestamp("created_At").default(sql`NOW()`).notNull(),
    updated_At: timestamp("updated_At").default(sql`NOW()`).notNull()
});


// orderMenuItem
export const orderMenuItemTable = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    order_Id: integer("order_id").notNull().references(() => ordersTable.id,  {onDelete:"cascade"}),
    menuItem_Id: integer("menuItem_Id").notNull().references(() => menuItemTable.id, {onDelete:"cascade"}),
    quantity: integer("quantity").notNull(),
    itemPrice: decimal("itemPrice").notNull(),
    price: decimal("price").notNull(),
    comment: text("comment")
});


// statusCatalog
export const statusCatalogTable = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull()
});

// orderStatus
export const orderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    orderId: integer("oderId").notNull().references(() => ordersTable.id, {onDelete:"cascade"}),
    statusCatalogId: integer("status_Catalog_Id").notNull().references(() => statusCatalogTable.id, {onDelete:"cascade"}),
    createdAt: timestamp("createAt").notNull().default(sql`NOW()`).notNull(),
});


// restaurantOwner
export const restaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurantId").notNull().references(() => restaurantTable.id, {onDelete:"cascade"}),
    ownerId: integer("ownerId").notNull().references(() => usersTable.id, {onDelete:"cascade"})
});

// orderRelationships
export const orderRelationships = relations(ordersTable, ({ one, many }) => ({
  user: one(usersTable, { // One-to-one relationship with usersTable
    fields: [ordersTable.user_Id],
    references: [usersTable.id],
  }),
  driver: one(driverTable, { // One-to-one relationship with driverTable
    fields: [ordersTable.driver_Id],
    references: [driverTable.id],
  }),
  restaurant: one(restaurantTable, { // One-to-one relationship with restaurantTable
    fields: [ordersTable.restaurant_Id],
    references: [restaurantTable.id],
  }),
  delivery_address: one(addressTable, { // One-to-one relationship with addressTable
    fields: [ordersTable.delivery_Address_Id],
    references: [addressTable.id],
  }),
  order_status: many(orderStatusTable), // One-to-many relationship with orderStatusTable
  order_menu_items: many(orderMenuItemTable), // One-to-many relationship with orderMenuItemTable
  menuItem: many(menuItemTable), // One-to-many relationship with menuItemTable
})
);

// restaurant relationships
export const restaurantRelationships = relations(restaurantTable, ({ one, many }) => ({
  city: one(cityTable, { // One-to-one relationship with cityTable
    fields: [restaurantTable.city_id],
    references: [cityTable.id],
  }),
  orders: many(ordersTable), // One-to-many relationship with ordersTable
  menuItem: many(menuItemTable), // One-to-many relationship with menuItemTable
  restaurantOwner: many(restaurantOwnerTable), // One-to-many relationship with restaurantOwneTable
})
);

// users relationships
export const usersRelationships = relations(usersTable, ({ many }) => ({
  address: many(addressTable), // One-to-many relationship with addressTable
  orders: many(ordersTable), // One-to-many relationship with ordersTable
  comments: many(commentTable), // One-to-many relationship with commentTable
  auth: many(AuthOnusersTable), // One-to-many relationship with authOnUsersTable
}));

// driver relationships
export const driverRelationships = relations(driverTable, ({ one, many }) => ({
  user: one(usersTable, { // One-to-one relationship with usersTable
    fields: [driverTable.user_id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable), // One-to-many relationship with ordersTable
}));

// menuItem relationships
export const menuItemRelationships = relations(menuItemTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, { // One-to-one relationship with restaurantTable
    fields: [menuItemTable.restaurantId],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, { // One-to-one relationship with categoryTable
    fields: [menuItemTable.categoryId],
    references: [categoryTable.id],
  }),
  order_menu_items: many(orderMenuItemTable), // One-to-many relationship with orderMenuItemTable
}));

// category relationships
export const categoryRelationships = relations(categoryTable, ({ many }) => ({
  menuItem: many(menuItemTable), // One-to-many relationship with menuItemTable
}));

// orderMenuItem relationships
export const orderMenuItemRelationships = relations(orderMenuItemTable, ({ one }) => ({
  order: one(ordersTable, { // One-to-one relationship with ordersTable
    fields: [orderMenuItemTable.order_Id],
    references: [ordersTable.id],
  }),
  menuItem: one(menuItemTable, { // One-to-one relationship with menuItemTable
    fields: [orderMenuItemTable.menuItem_Id],
    references: [menuItemTable.id],
  }),
}));

// order status relationships
export const orderStatusRelationships = relations(orderStatusTable, ({ one }) => ({
  order: one(ordersTable, { // One-to-one relationship with ordersTable
    fields: [orderStatusTable.orderId],
    references: [ordersTable.id],
  }),
  statusCatalog: one(statusCatalogTable, { // One-to-one relationship with statusCatalogTable
    fields: [orderStatusTable.statusCatalogId],
    references: [statusCatalogTable.id],
  }),
}));

// status catalog relationships
export const statusCatalogRelationships = relations(statusCatalogTable, ({ many }) => ({
  orderStatus: many(orderStatusTable), // One-to-many relationship with orderStatusTable
}));

// comments relationships
export const commentsRelationships = relations(commentTable, ({ one }) => ({
  order: one(ordersTable, { // One-to-one relationship with ordersTable
    fields: [commentTable.order_id],
    references: [ordersTable.id],
  }),
  user: one(usersTable, { // One-to-one relationship with usersTable
    fields: [commentTable.user_id],
    references: [usersTable.id],
  }),
}));

// state relationships
export const stateRelationships = relations(StateTable, ({ many }) => ({
  city: many(cityTable), // One-to-many relationship with cityTable
}));

// city relationships
export const cityRelationships = relations(cityTable, ({ one, many }) => ({
  state: one(StateTable, { // One-to-one relationship with StateTable
    fields: [cityTable.state_Id],
    references: [StateTable.id],
  }),
  address: many(addressTable), // One-to-many relationship with addressTable
  restaurant: many(restaurantTable), // One-to-many relationship with restaurantTable
}));

// address relationships
export const addressRelationships = relations(addressTable, ({ one, many }) => ({
  city: one(cityTable, { // One-to-one relationship with cityTable
    fields: [addressTable.city_Id],
    references: [cityTable.id],
  }),
  user: one(usersTable, { // One-to-one relationship with usersTable
    fields: [addressTable.user_Id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable), // One-to-many relationship with ordersTable
}));

// restaurant owner relationships
export const restaurantOwnerRelationships = relations(restaurantOwnerTable, ({ one }) => ({
  restaurant: one(restaurantTable, { // One-to-one relationship with restaurantTable
    fields: [restaurantOwnerTable.restaurantId],
    references: [restaurantTable.id],
  }),
  owner: one(usersTable, { // One-to-one relationship with usersTable
    fields: [restaurantOwnerTable.ownerId],
    references: [usersTable.id],
  }),
}));
  
  export const roleEnum =pgEnum("role", ["admin","user","both"])
 // auth table
  export const AuthOnusersTable = pgTable("auth_on_users",{
    id:serial("id").primaryKey(),
    userId:integer("user_id").notNull().references(()=> usersTable.id,{onDelete: "cascade"}),
    password: varchar("password", {length: 100}),
    username: varchar("username", {length:100}),
    role: roleEnum("role").default("user"),
  });
  // create relationshiop of user

  export const AuthOnuserRelations = relations(AuthOnusersTable, ({one})=>({
     user: one (usersTable, {
      fields:[AuthOnusersTable.userId],
      references: [usersTable.id]
     })
  }));


export type TIState = typeof StateTable.$inferInsert;
export type TSState = typeof StateTable.$inferSelect;

export type TICity = typeof cityTable.$inferInsert;
export type TSCity = typeof cityTable.$inferSelect;

export type TIAddress =typeof addressTable.$inferInsert
export type TSAddress = typeof addressTable.$inferSelect

export type TIRestaurant = typeof restaurantTable.$inferInsert;
export type TSRestaurant = typeof restaurantTable.$inferSelect;

export  type TIUsers = typeof usersTable.$inferInsert;
export type TSUsers = typeof usersTable.$inferSelect;

export type TIstatus_catalog = typeof statusCatalogTable.$inferInsert;
export type TSstatus_catalog = typeof statusCatalogTable.$inferSelect;

export type TICategory = typeof categoryTable.$inferInsert;
export type TSCategory = typeof categoryTable.$inferSelect;

export type TIDriver = typeof driverTable.$inferInsert;
export type TSDriver =typeof driverTable.$inferSelect;

export type TSOrderMenuItem = typeof orderMenuItemTable.$inferSelect;
export type TIOrderMenuItem = typeof orderMenuItemTable.$inferInsert

export type TIOrders = typeof ordersTable.$inferInsert;
export type TSOrders = typeof ordersTable.$inferSelect;

export type TIOrderStatus =typeof orderStatusTable.$inferInsert;
export type TSOrderStatus = typeof orderStatusTable.$inferSelect;

export type TIRestaurantOwner =typeof restaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof restaurantOwnerTable.$inferSelect;

export type TIComment = typeof commentTable.$inferInsert;
export type TSComment = typeof commentTable.$inferSelect;

export type TIMenuItem = typeof menuItemTable.$inferInsert;
export type TSMenuItem = typeof menuItemTable.$inferSelect;

export type TIAuthUser = typeof AuthOnusersTable.$inferInsert;
export type TSAuthUser = typeof AuthOnusersTable.$inferSelect;
