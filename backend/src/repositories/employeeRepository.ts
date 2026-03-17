import { departments as seedDepartments } from "../data/employeeData";
import type { Department, Employee } from "../types/departmentTypes";

let departments: Department[] = structuredClone(seedDepartments);

export function getDepartments(): Department[] {
    return departments;
}

// Adds an employee to a department. Returns the updated list of departments, or null if the department does not exist.
export function addEmployee(departmentName: string, employee: Employee): Department[] | null {
    const hasDepartment = departments.some((department) => department.name === departmentName);
    if (!hasDepartment) {
        return null;
    }

    departments = departments.map((department) =>
        department.name === departmentName
            ? { ...department, employees: [...department.employees, employee] }
            : department
    );

    return departments;
}
