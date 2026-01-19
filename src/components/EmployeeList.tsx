import type { Employee, Department } from "../types/departmentTypes";

// not sure if it's better to define types here or import them
interface EmployeeItemProps {
    employee: Employee;
    departmentName: string;
}

function EmployeeItem({ employee, departmentName }: EmployeeItemProps) {
    const fullName = `${employee.firstName} ${employee.lastName || ""}`.trim();
    
    return (
        <li>
            <span className="employee-name">{fullName}</span>
            <span className="department-name">{departmentName}</span>
        </li>
    );
}

interface EmployeeListProps {
    departments: Department[];
}

export function EmployeeList({ departments }: EmployeeListProps) {
    return (
        <div id="main">
            <ul>
                {departments.map((dept) => 
                    dept.employees.map((emp, index) => (
                        <EmployeeItem 
                            // concatenate values to ensure unique key
                            key={`${dept.name}-${emp.firstName}-${emp.lastName}-${index}`}
                            employee={emp}
                            departmentName={dept.name}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}
