import { Header } from "./Header";
import { Footer } from "./Footer";
import { EmployeeList } from "./EmployeeList";
import type { Department } from "../types/departmentTypes";

interface PageProps {
    departments: Department[];
}

export function Page({ departments }: PageProps) {
    return (
        <>
            <Header />
            <EmployeeList departments={departments} />
            <Footer />
        </>
    );
}
