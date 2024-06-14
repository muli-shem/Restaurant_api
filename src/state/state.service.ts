import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIState, TSState, StateTable } from "../drizzle/schema";

export const StateService= async (limit?: number): Promise<TSState[] | null> => {
    if (limit) {
        return await db.query.StateTable.findMany({limit: limit}
        );
    }
    return await db.query.StateTable.findMany({
        with:{
            cities:{
                columns:{
                    name:true,
                    state_Id:true,
                }

            }
        }
    }

    );
}
export const getStateByIdService = async (id: number): Promise<TIState | undefined> => {
    return await db.query.StateTable.findFirst({
        where: eq(StateTable.id, id)
    })
}

export const createStateService = async (state: TIState) => {
    await db.insert(StateTable).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: TIState) => {
    await db.update(StateTable).set(state).where(eq(StateTable.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(StateTable).where(eq(StateTable.id, id))
    return "state  deleted successfully";
}