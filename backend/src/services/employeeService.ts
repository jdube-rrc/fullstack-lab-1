import type { Department, Employee } from "../types/departmentTypes";
import { addEmployee, getDepartments } from "../repositories/employeeRepository";

interface EmployeeValidationErrors {
    firstName?: string;
    department?: string;
}

// basic type for true or false result of validation, with optional error messages for each field
type CreateEmployeeResult =
    | { success: true; departments: Department[] }
    | { success: false; errors: EmployeeValidationErrors };

export function listDepartments(): Department[] {
    return getDepartments();
}

export function createEmployee(departmentName: string, employee: Employee): CreateEmployeeResult {
    const errors: EmployeeValidationErrors = {};

    if (!departmentName.trim()) {
        errors.department = "Department is required.";
    }

    if (employee.firstName.trim().length < 3) {
        errors.firstName = "First name must be at least 3 characters long.";
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    const departments = addEmployee(departmentName, employee);
    if (!departments) {
        return {
            success: false,
            errors: { department: "Department does not exist." },
        };
    }

    return { success: true, departments };
}
