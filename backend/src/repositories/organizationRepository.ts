import { managementData } from "../data/managementData";
import type { Role } from "../types/departmentTypes";

let organization: Role[] = structuredClone(managementData);

export function getOrganization(): Role[] {
    return organization;
}

// Checks if a role is already occupied in the organization
export function isRoleOccupied(roleName: string): boolean {
    return organization.some((entry) => entry.role.toLowerCase() === roleName.toLowerCase());
}

// Adds a new role entry to the organization and returns the updated list of roles
export function addOrganizationEntry(entry: Role): Role[] {
    organization = [...organization, entry];
    return organization;
}
