import type { NextFunction, Request, Response } from "express";
import { createClerkClient } from "@clerk/clerk-sdk-node";

const secretKey = process.env.CLERK_SECRET_KEY;

const clerkClient = secretKey
    ? createClerkClient({ secretKey })
    : null;

function getBearerToken(headerValue: string | undefined): string | null {
    if (!headerValue) {
        return null;
    }

    const [scheme, token] = headerValue.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }

    return token;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!clerkClient) {
        res.status(500).json({ error: "Clerk is not configured on the server." });
        return;
    }

    const token = getBearerToken(req.header("Authorization"));
    if (!token) {
        res.status(401).json({ error: "Authentication is required." });
        return;
    }

    try {
        await clerkClient.verifyToken(token);
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired authentication token." });
    }
}