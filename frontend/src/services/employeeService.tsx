import type { Employee, Department } from "../types/departmentTypes";
import {
    addEmployeeToDepartment,
    fetchDepartments as fetchDepartmentsFromRepo,
} from "../repositories/employeeRepo";

export interface ValidationResult {
    success: boolean;
    errors: {
        firstName?: string;
        department?: string;
    };
}

// Fetches the list of departments from the repository
export async function fetchDepartments(): Promise<Department[]> {
    return fetchDepartmentsFromRepo();
}

// updated to return a promise with success status and either the updated departments or validation errors
export async function createEmployee(
    departmentName: string,
    employee: Employee,
    token: string | null
): Promise<{ success: true; departments: Department[] } | { success: false; errors: ValidationResult["errors"] }> {
    const response = await addEmployeeToDepartment(departmentName, employee, token);
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            errors: responseData.errors ?? { department: "Failed to create employee." },
        };
    }

    return { success: true, departments: responseData.departments };
}
