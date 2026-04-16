import type { Role } from "../types/departmentTypes";
import {
    addRoleToOrganization,
    fetchOrganization as fetchOrganizationFromRepo,
} from "../repositories/organizationRepo";

export interface OrganizationValidationResult {
    success: boolean;
    errors: {
        firstName?: string;
        lastName?: string;
        role?: string;
    };
}

// Fetches the list of organization roles from the repository
export async function fetchOrganization(): Promise<Role[]> {
    return fetchOrganizationFromRepo();
}

// updated to return a promise with success status and either the updated organization or validation errors
export async function createOrganizationEntry(
    newEntry: Role,
    token: string | null
): Promise<{ success: true; organization: Role[] } | { success: false; errors: OrganizationValidationResult["errors"] }> {
    const response = await addRoleToOrganization(newEntry, token);
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            errors: responseData.errors ?? { role: "Failed to create organization entry." },
        };
    }

    return { success: true, organization: responseData.organization };
}
