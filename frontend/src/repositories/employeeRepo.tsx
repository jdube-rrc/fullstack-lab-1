import type { Employee, Department } from "../types/departmentTypes";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function fetchDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE}/departments`);
    if (!response.ok) {
        throw new Error("Failed to load departments.");
    }
    return response.json() as Promise<Department[]>;
}

export async function addEmployeeToDepartment(
    departmentName: string,
    employee: Employee,
    token: string | null
): Promise<Response> {
    return fetch(`${API_BASE}/departments/${encodeURIComponent(departmentName)}/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(employee),
    });
}
