import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { EmployeeList } from "./EmployeeList";
import type { Department, Employee } from "../types/departmentTypes";
import NewEmployeeForm from "./NewEmployeeForm";

interface PageProps {
    departments: Department[];
}

export function Page({ departments }: PageProps) {
    // keep the departments in state so the list updates when we add employees
    const [departmentList, setDepartmentList] = useState<Department[]>(departments);

    // add the new employee to the selected department
    const handleAddEmployee = (departmentName: string, employee: Employee) => {
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
            <Header />
            <EmployeeList departments={departmentList} />
            <NewEmployeeForm
                departments={departmentList}
                onAddEmployee={handleAddEmployee}
            />
            <Footer />
        </>
    );
}
