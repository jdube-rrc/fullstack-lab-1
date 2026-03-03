import type { Role } from "../types/departmentTypes";
import { addRoleToOrganization, isRoleOccupied } from "../repositories/organizationRepo";

export interface OrganizationValidationResult {
    success: boolean;
    errors: {
        firstName?: string;
        lastName?: string;
        role?: string;
    };
}

// Validates that first name has at least 3 characters
export function validateFirstName(firstName: string): string | null {
    return firstName.trim().length >= 3 ? null : "First name must be at least 3 characters long.";
}

// Validates that the role is not already occupied
export function validateRole(organization: Role[], roleName: string): string | null {
    if (!roleName.trim()) {
        return "Role is required.";
    }
    return isRoleOccupied(organization, roleName) ? "This role is already occupied." : null;
}

// Attempts to create a new organization entry
export function createOrganizationEntry(
    organization: Role[],
    newEntry: Role
): { success: true; organization: Role[] } | { success: false; errors: OrganizationValidationResult["errors"] } {
    const errors: OrganizationValidationResult["errors"] = {};

    // Validate first name
    const firstNameError = validateFirstName(newEntry.firstName);
    if (firstNameError) {
        errors.firstName = firstNameError;
    }

    // Validate role is not occupied
    const roleError = validateRole(organization, newEntry.role);
    if (roleError) {
        errors.role = roleError;
    }

    // If any validation failed, return errors
    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    // Invoke repository to add the new entry
    const updatedOrganization = addRoleToOrganization(organization, newEntry);
    return { success: true, organization: updatedOrganization };
}
