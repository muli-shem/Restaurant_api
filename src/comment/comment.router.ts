import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getCommentsController, getCommentByIdController, createCommentController, updateCommentController, deleteCommentController } from './comment.controller';
import { commentsSchema } from "../validator";

export const commentsRouter = new Hono()

// get all comments
commentsRouter
    .get("comment", getCommentsController)
    .post("comment", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createCommentController)

// get comment by id

commentsRouter
    .get("comment/:id", getCommentByIdController)
    .put("comment/:id", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateCommentController)
    .delete("comment/:id", deleteCommentController)