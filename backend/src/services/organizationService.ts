import type { Role } from "../types/departmentTypes";
import {
    addOrganizationEntry,
    getOrganization,
    isRoleOccupied,
} from "../repositories/organizationRepository";

interface OrganizationValidationErrors {
    firstName?: string;
    role?: string;
}

// basic type for true or false result of validation, with optional error messages for each field
type CreateOrganizationResult =
    | { success: true; organization: Role[] }
    | { success: false; errors: OrganizationValidationErrors };

export function listOrganization(): Role[] {
    return getOrganization();
}

export function createOrganizationEntry(entry: Role): CreateOrganizationResult {
    const errors: OrganizationValidationErrors = {};

    if (entry.firstName.trim().length < 3) {
        errors.firstName = "First name must be at least 3 characters long.";
    }

    if (!entry.role.trim()) {
        errors.role = "Role is required.";
    } else if (isRoleOccupied(entry.role)) {
        errors.role = "This role is already occupied.";
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    const organization = addOrganizationEntry(entry);
    return { success: true, organization };
}
