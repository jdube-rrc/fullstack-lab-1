import type { Employee, Department } from "../types/departmentTypes";
import { addEmployeeToDepartment } from "../repositories/employeeRepo";

export interface ValidationResult {
    success: boolean;
    errors: {
        firstName?: string;
        department?: string;
    };
}

// Validates that the department exists
export function validateDepartment(departmentName: string, departments: Department[]): string | null {
    const departmentExists = departments.some((dept) => dept.name === departmentName);
    return departmentExists ? null : "Department does not exist.";
}

// Validates that first name has at least 3 characters
export function validateFirstName(firstName: string): string | null {
    return firstName.trim().length >= 3 ? null : "First name must be at least 3 characters long.";
}

// attempts to create an employee
export function createEmployee(
    departments: Department[],
    departmentName: string,
    employee: Employee
): { success: true; departments: Department[] } | { success: false; errors: ValidationResult["errors"] } {
    const errors: ValidationResult["errors"] = {};

    // validate department exists
    const departmentError = validateDepartment(departmentName, departments);
    if (departmentError) {
        errors.department = departmentError;
    }

    // validate first name
    const firstNameError = validateFirstName(employee.firstName);
    if (firstNameError) {
        errors.firstName = firstNameError;
    }

    // if any validation failed return errors
    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    // invoke repository to create employee
    const updatedDepartments = addEmployeeToDepartment(departments, departmentName, employee);
    return { success: true, departments: updatedDepartments };
}
