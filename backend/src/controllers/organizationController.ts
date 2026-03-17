import type { Request, Response } from "express";
import {
    createOrganizationEntry,
    listOrganization,
} from "../services/organizationService";

export function getOrganizationController(_req: Request, res: Response): void {
    res.json(listOrganization());
}

// Validates the request body and adds a new organization entry if valid. 
// Returns the updated organization list or validation errors.
export function addOrganizationController(req: Request, res: Response): void {
    const firstName = typeof req.body?.firstName === "string" ? req.body.firstName : "";
    const lastName = typeof req.body?.lastName === "string" ? req.body.lastName : "";
    const role = typeof req.body?.role === "string" ? req.body.role : "";

    const result = createOrganizationEntry({ firstName, lastName, role });

    if (!result.success) {
        res.status(400).json({ errors: result.errors });
        return;
    }

    res.status(201).json({ organization: result.organization });
}
