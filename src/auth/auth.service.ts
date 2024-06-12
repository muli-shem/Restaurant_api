import{TSAuthUser, TIAuthUser, AuthOnusersTable} from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async(user:TIAuthUser) =>{
    await db.insert(AuthOnusersTable).values(user)
    return "User created successfully"
}

export const userLoginService = async(user:TSAuthUser) =>{
    const {username, password} =user;
    return await db.query.AuthOnusersTable.findFirst({
        columns:{
            username:true,
            role:true,
            password:true
        },where: sql`${AuthOnusersTable.username}= ${username}`,
        with:{
            user:{
                columns:{
                    name:true,
                    ccontact_Phone:true,
                    email:true,
                    id:true

                }
                
            }
        }
    })

}


