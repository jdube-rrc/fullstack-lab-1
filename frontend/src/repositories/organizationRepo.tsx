import type { Role } from "../types/departmentTypes";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function fetchOrganization(): Promise<Role[]> {
    const response = await fetch(`${API_BASE}/organization`);
    if (!response.ok) {
        throw new Error("Failed to load organization data.");
    }
    return response.json() as Promise<Role[]>;
}

export async function addRoleToOrganization(newRole: Role, token: string | null): Promise<Response> {
    return fetch(`${API_BASE}/organization`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newRole),
    });
}
