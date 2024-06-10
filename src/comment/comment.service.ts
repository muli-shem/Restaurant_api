import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIComment, TSComment, commentTable } from "../drizzle/schema";

// GET ALL COMMENTS
export const getCommentsService = async (): Promise<TSComment[] | null> => {
    const comment = await db.query.commentTable.findMany();
    return comment;
};

// GET COMMENT BY ID
export const getCommentByIdService = async (id: number): Promise<TSComment | undefined> => {
    const comment = await db.query.commentTable.findFirst({
        where: eq(commentTable.id, id)
    });
    return comment;
}

// CREATE COMMENT
export const createCommentService = async (comment: TIComment) => {
    await db.insert(commentTable).values(comment)
    return "comment created successfully";
}

//  UPDATE COMMENT
export const updateCommentService = async (id: number, comment: TIComment) => {
    await db.update(commentTable).set(comment).where(eq(commentTable.id, id));
    return "comment updated successfully";
}

// DELETE COMMENT
export const deleteCommentService = async (id: number) => {
    await db.delete(commentTable).where(eq(commentTable.id, id));
    return "comment deleted successfully";
}