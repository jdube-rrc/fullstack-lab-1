import type { Employee, Department } from "../types/departmentTypes";

// Adds an employee to a department in the departments array
export function addEmployeeToDepartment(
    departments: Department[],
    departmentName: string,
    employee: Employee
): Department[] {
    return departments.map((dept) =>
        dept.name === departmentName
            ? { ...dept, employees: [...dept.employees, employee] }
            : dept
    );
}
