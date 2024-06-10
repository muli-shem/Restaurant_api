
import { pgTable, serial, text, varchar,boolean,integer,timestamp,decimal } from "drizzle-orm/pg-core";
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

// MenuItem belongs to a Restaurant
export const menuItemRestaurantRelations = relations(menuItemTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
        fields: [menuItemTable.restaurantId],
        references: [restaurantTable.id]
    })
}));


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



// Restaurant and Menu Item relationship
export const menuItemRelations = relations(menuItemTable, ({ one }) => ({  //denotes the relationship between restaurant and menu item
    restaurant: one(restaurantTable, {    // one menu item belongs to one restaurant
      fields: [menuItemTable.restaurantId],
      references: [restaurantTable.id],
    }),
    category: one(categoryTable, {    // one menu item belongs to one category
      fields: [menuItemTable.categoryId],
      references: [categoryTable.id],
    }),
  }));
  
  export const restaurantMenuItemsRelations = relations(
    restaurantTable,
    ({ many }) => ({    //denotes the relationship between restaurant and menu item
      menuItems: many(menuItemTable), // one restaurant can have many menu items
    })
  );
  
  // 6. Menu Item and Category relationship
  export const categoryMenuItemsRelations = relations(
    categoryTable,
    ({ many }) => ({    //denotes the relationship between category and menu item
      menuItems: many(menuItemTable), // one category can have many menu items
    })
  );
  
  // 4. Address and User relationship
  export const userAddressRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and address
    addresses: many(addressTable), // one user can have many addresses
  }));
  
  // 1. State and City relationship
  export const stateRelations = relations(StateTable, ({ many }) => ({  //denotes the relationship between state and city
    cities: many(cityTable), // one state can have many cities
  }));
  
  export const cityRelations = relations(cityTable, ({ one }) => ({  // denotes the relationship between city and state
    state: one(StateTable, {    // one city belongs to one state
      fields: [cityTable.state_Id],
      references: [StateTable.id],
    }),
  }));
  
  // City and Address relationship
  export const addressRelations = relations(addressTable, ({ one }) => ({  //denotes the relationship between city and address
    city: one(cityTable, {    // one address belongs to one city
      fields: [addressTable.city_Id],
      references: [cityTable.id],
    }),
    user: one(usersTable, {    // one address belongs to one user
      fields: [addressTable.user_Id],
      references: [usersTable.id],
    }),
  }));
  
  export const cityAddressRelations = relations(cityTable, ({ many }) => ({  //denotes the relationship between city and address
    addresses: many(addressTable),
  
  }));
  
  //  City and Restaurant relationship
  export const cityRestaurantRelations = relations(cityTable, ({ many }) => ({  //denotes the relationship between city and restaurant
    restaurants: many(restaurantTable), // one city can have many restaurants
  }));
  
  export const restaurantRelations = relations(restaurantTable, ({ one }) => ({  //denotes the relationship between restaurant and city
    city: one(cityTable, {    // one restaurant belongs to one city
      fields: [restaurantTable.city_id],
      references: [cityTable.id],
    }),
  }));
  
  //  Restaurant and Owner relationship
  export const restaurantOwnerRelations = relations(
    restaurantOwnerTable,
    ({ one }) => ({    //denotes the relationship between restaurant and owner
      restaurant: one(restaurantTable, {      // one owner belongs to one restaurant
        fields: [restaurantOwnerTable.restaurantId],
        references: [restaurantTable.id],
      }),
      owner: one(usersTable, {      // one owner belongs to one user
        fields: [restaurantOwnerTable.ownerId],
        references: [usersTable.id],
      }),
    })
  );
  
  
  // Order and User relationship
  export const userOrderRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and order
    orders: many(ordersTable), // one user can have many orders
  }));
  
  export const orderUserRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and user
    user: one(usersTable, {    // one order belongs to one user
      fields: [ordersTable.user_Id],
      references: [usersTable.id],
    }),
  }));
  
  // Order and Restaurant relationship
  export const orderRestaurantRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and restaurant
    restaurant: one(restaurantTable, {    // one order belongs to one restaurant
      fields: [ordersTable.restaurant_Id],
      references: [restaurantTable.id],
    }),
  }));
  
  export const restaurantOrderRelations = relations(
    restaurantTable,
    ({ many }) => ({    // denotes the relationship between restaurant and order
      orders: many(ordersTable), // one restaurant can have many orders
    })
  );
  
  //  Order and Driver relationship
  export const driverOrderRelations = relations(driverTable, ({ many }) => ({  //denotes the relationship between driver and order
    orders: many(ordersTable), // one driver can have many orders
  }));
  
  export const orderDriverRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and driver
    driver: one(driverTable, {    // one order belongs to one driver
      fields: [ordersTable.driver_Id],
      references: [driverTable.id],
    }),
  }));
  
  // Order and Menu Item relationship
  export const orderMenuItemRelations = relations(
    orderMenuItemTable,
    ({ one }) => ({    //denotes the relationship between order and menu item
      order: one(ordersTable, {      // one order belongs to one menu item
        fields: [orderMenuItemTable.order_Id],
        references: [ordersTable.id],
      }),
      menuItem: one(menuItemTable, {      // one order belongs to one menu item
        fields: [orderMenuItemTable.menuItem_Id],
        references: [menuItemTable.id],
      }),
    })
  );
  
  //  Order and Status relationship
  export const orderStatusRelations = relations(orderStatusTable, ({ one }) => ({  //denotes the relationship between order and status
    order: one(ordersTable, {    // one status belongs to one order
      fields: [orderStatusTable.orderId],
      references: [ordersTable.id],
    }),
    statusCatalog: one(statusCatalogTable, {    // one status belongs to one status catalog
      fields: [orderStatusTable.statusCatalogId],
      references: [statusCatalogTable.id],
    }),
  }));
  
  
  //  Status and Catalog relationship
  export const statusCatalogRelations = relations(
    statusCatalogTable,
    ({ many }) => ({    //denotes the relationship between status and catalog
      statuses: many(orderStatusTable), // one status can have many orders
    })
  );
  //  Order and Comments relationship
  export const orderCommentRelations = relations(commentTable, ({ one }) => ({  //denotes the relationship between order and comments
    order: one(ordersTable, {    // one comment belongs to one order
      fields: [commentTable.order_id],
      references: [ordersTable.id],
    }),
    user: one(usersTable, {    // one comment belongs to one user
      fields: [commentTable.user_id],
      references: [usersTable.id],
    }),
  }));
  
  export const orderCommentsRelations = relations(ordersTable, ({ many }) => ({  //denotes the relationship between order and comments
    comment: many(commentTable), // one order can have many comments
  }));
  
  //  User and Comments relationship
  export const userCommentRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and comments
    comment: many(commentTable), // one user can have many comments
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
