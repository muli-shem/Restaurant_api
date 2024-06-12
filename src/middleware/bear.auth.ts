import "dotenv/config";  // Loads environment variables from a .env file into process.env
import { verify } from "hono/jwt";  // Imports the verify function from Hono's JWT module for verifying JWT tokens
import { Context, Next } from "hono";  // Imports Context and Next types from Hono

interface HonoRequest<T, U> {
    user?: T;  // Optional user property that can be attached to the request
    // Add other properties if needed
}

// AUTHENTICATION MIDDLEWARE
// Function to verify a JWT token using a secret
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret);  // Verifies the token using the secret
        return decoded;  // Returns the decoded token if verification is successful
    } catch (error: any) {
        return null;  // Returns null if there is an error (i.e., token is invalid)
    }
}


// Function to check authorization based on the required role
export const authMiddleware = async (c: Context & { req: HonoRequest<any, unknown> }, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");  // Retrieves the Authorization header from the request

    if (!token) return c.json({ error: "Token is required" }, 401);  // If no token is provided, return a 401 response

    const decoded = await verifyToken(token as string, process.env.JWT_SECRET as string);  // Verifies the token using the secret from environment variables

    if (!decoded) return c.json({ error: "Invalid token" }, 401);  // If the token is invalid, return a 401 response

    if (requiredRole === "both") {
        if (decoded.role === "admin" || decoded.role === "user") {  // Check if the role is either admin or user
            c.req.user = decoded;  // Attach the decoded token to the request
            return next();  // Proceed to the next middleware or route handler
        }
    } else if (decoded.role === requiredRole) {  // Check if the role matches the required role
        c.req.user = decoded;  // Attach the decoded token to the request
        return next();  // Proceed to the next middleware or route handler
    }

    return c.json({ error: "Unauthorized" }, 401);  // If role doesn't match, return a 401 response
}

// Middleware for admin role authorization
// Calls authMiddleware with "admin" as the required role
export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");

// Middleware for user role authorization
// Calls authMiddleware with "user" as the required role
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");

// Middleware for both admin and user role authorization
// Calls authMiddleware with "both" as the required role
export const bothRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both");
