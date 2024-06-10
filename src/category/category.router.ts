import { Hono } from 'hono'
import { categorySchema } from "../validator";
import { getCategoriesController, getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController   } from './category.controller';
import { zValidator } from '@hono/zod-validator';

export const categoryRouter = new Hono()

// get all categories
categoryRouter
    .get("category", getCategoriesController)
    .post("category", zValidator('json', categorySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createCategoryController)
    

// get category by id
categoryRouter
    .get("category/:id", getCategoryByIdController)
    .put("category/:id", zValidator('json', categorySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateCategoryController)
    .delete("category/:id", deleteCategoryController)