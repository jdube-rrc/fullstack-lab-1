import { type FormEvent } from "react";
import type { Employee, Department } from "../types/departmentTypes";
import { useFormInput } from "../hooks/useFormInput";
import { createEmployee } from "../services/employeeService";

interface NewEmployeeFormProps {
    departments: Department[];
    onDepartmentsChange: (departments: Department[]) => void;
}

// is passed the departments and callback to update them from Page.tsx
export default function NewEmployeeForm({ departments, onDepartmentsChange }: NewEmployeeFormProps) {
    const firstName = useFormInput<string>("");
    const lastName = useFormInput<string>("");
    const selectedDepartment = useFormInput<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Clear previous error messages
        firstName.setMessage(null);
        selectedDepartment.setMessage(null);

        // build the employee object
        const newEmployee: Employee = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
        };

        // Use the service to validate and create the employee
        const result = createEmployee(departments, selectedDepartment.value, newEmployee);

        if (!result.success) {
            // Set error messages on the hooks
            if (result.errors.firstName) firstName.setMessage(result.errors.firstName);
            if (result.errors.department) selectedDepartment.setMessage(result.errors.department);
            return;
        }

        // Update departments with the result from the service
        onDepartmentsChange(result.departments);

        // reset the form using the hook's reset method
        firstName.reset("");
        lastName.reset("");
        selectedDepartment.reset("");
    };

    return (
        <section>
            <h2>Add New Employee</h2>
            <form className="new-employee-form" onSubmit={handleSubmit}>
                {/* when the user types it will update state of firstName and lastName */}
                <label>
                    First Name:
                    <input
                        name="firstName"
                        value={firstName.value}
                        onChange={(e) => firstName.setValue(e.target.value)}
                    />
                    {firstName.message && <span className="error-message">{firstName.message}</span>}
                </label>
                <label>
                    Last Name:
                    <input
                        name="lastName"
                        value={lastName.value}
                        onChange={(e) => lastName.setValue(e.target.value)}
                    />
                    {lastName.message && <span className="error-message">{lastName.message}</span>}
                </label>
                <label>
                    {/* when the user selects a department it will update state of selectedDepartment */}
                    Department: 
                    <select
                        name="department"
                        value={selectedDepartment.value}
                        onChange={(e) => selectedDepartment.setValue(e.target.value)}
                    >
                        {/* options for departments */}
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                            <option key={dept.name} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    {selectedDepartment.message && <span className="error-message">{selectedDepartment.message}</span>}
                </label>
                <hr />
                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}