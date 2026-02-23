import { useState } from "react";
import { EmployeeList } from "../EmployeeList";
import type { Department } from "../../types/departmentTypes";
import NewEmployeeForm from "../NewEmployeeForm";

interface EmployeePageProps {
    departments: Department[];
}

export function EmployeePage({ departments }: EmployeePageProps) {
    // keep the departments in state so the list updates when we add employees
    const [departmentList, setDepartmentList] = useState<Department[]>(departments);

    return (
        <>
            <EmployeeList departments={departmentList} />
            <NewEmployeeForm
                departments={departmentList}
                onDepartmentsChange={setDepartmentList}
            />
        </>
    );
}
