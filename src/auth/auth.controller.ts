import { Context} from "hono";
import bcrypt from "bcrypt";
import {sign} from "hono/jwt";
import {createAuthUserService, userLoginService} from "./auth.service"
import { error } from "console";
import { any } from "zod";



export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}
export const loginUser = async (c: Context) => {
    try{
        const user = await c.req.json();
         //check if user exist
        
         const userExist = await userLoginService(user);
         if(userExist === null){
            return c.json({error: "User not found"}, 400);
         }
         const userMatch = await bcrypt.compare(user.password as string, userExist?.password as string)
         if(!userMatch){
            return c.json({error: "Invalid credentials"}, 400);// unauthorized
         } else {
            // create a payload  // generate a jwt token 
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)  // 3 hour  => SESSION EXPIRATION
            }
            let secret = process.env.JWT_SECRET as string; //secret key
            const token = await sign(payload, secret); //create a JWT token
            let user = userExist?.user;
            let role = userExist?.role;
            return c.json({token, user:{role, ...user}}, 200);//return token and user details
         }
    }catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}