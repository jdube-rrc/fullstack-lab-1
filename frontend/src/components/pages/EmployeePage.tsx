import { useEffect, useState } from "react";
import { EmployeeList } from "../EmployeeList";
import type { Department } from "../../types/departmentTypes";
import NewEmployeeForm from "../NewEmployeeForm";
import { fetchDepartments } from "../../services/employeeService";

export function EmployeePage() {
    const [departmentList, setDepartmentList] = useState<Department[]>([]);

    useEffect(() => {
        fetchDepartments()
            .then(setDepartmentList)
            .catch(() => setDepartmentList([]));
    }, []);

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
