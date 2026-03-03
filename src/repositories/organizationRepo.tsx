import type { Role } from "../types/departmentTypes";

// Adds a new role entry to the organization data
export function addRoleToOrganization(
    organization: Role[],
    newRole: Role
): Role[] {
    return [...organization, newRole];
}

// Checks if a role is already occupied in the organization
export function isRoleOccupied(organization: Role[], roleName: string): boolean {
    return organization.some((entry) => entry.role === roleName);
}
