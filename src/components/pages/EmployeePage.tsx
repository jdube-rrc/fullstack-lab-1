import { useState } from "react";
import { EmployeeList } from "../EmployeeList";
import type { Department, Employee } from "../../types/departmentTypes";
import NewEmployeeForm from "../NewEmployeeForm";

interface EmployeePageProps {
    departments: Department[];
}

export function EmployeePage({ departments }: EmployeePageProps) {
    // keep the departments in state so the list updates when we add employees
    const [departmentList, setDepartmentList] = useState<Department[]>(departments);

    // add the new employee to the selected department
    const handleAddEmployee = (departmentName: string, employee: Employee) => {
        // functional state update to ensure we have the latest state
        setDepartmentList((current) =>
            current.map((dept) =>
                dept.name === departmentName
                    ? { ...dept, employees: [...dept.employees, employee] }
                    : dept
            )
        );
    };

    return (
        <>
            <EmployeeList departments={departmentList} />
            <NewEmployeeForm
                departments={departmentList}
                onAddEmployee={handleAddEmployee}
            />
        </>
    );
}
