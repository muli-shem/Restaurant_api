import db from '../drizzle/db';
import { TICity, TSCity, StateTable, cityTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Function to check if a state exists by its ID
const stateExists = async (stateId: number): Promise<boolean> => {
    const state = await db.query.StateTable.findFirst({
        where: eq(StateTable.id, stateId)
    });
    return state !== undefined;
}

export const cityService = async (): Promise<TSCity[] | null> => {
    return await db.select().from(cityTable);
}

export const getCityService = async (id: number): Promise<TICity | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    });
}

export const createCityService = async (city: TICity): Promise<string> => {
    if (!city.state_Id) {
        throw new Error("state_Id is required for creating a city");
    }

    // Validate state_Id
    const stateExistsCheck = await stateExists(city.state_Id);
    if (!stateExistsCheck) {
        throw new Error(`State with ID ${city.state_Id} does not exist`);
    }

    await db.insert(cityTable).values(city);
    return "City created successfully";
}

export const updateCityService = async (id: number, city: TICity): Promise<string> => {
    if (city.state_Id !== undefined) {
        // Validate state_Id if it's being updated
        const stateExistsCheck = await stateExists(city.state_Id);
        if (!stateExistsCheck) {
            throw new Error(`State with ID ${city.state_Id} does not exist`);
        }
    }

    await db.update(cityTable).set(city).where(eq(cityTable.id, id));
    return "City updated successfully";
}

export const deleteCityService = async (id: number): Promise<string> => {
    await db.delete(cityTable).where(eq(cityTable.id, id));
    return "City deleted successfully";
}
