import { type FormEvent } from "react";
import type { Employee, Department } from "../types/departmentTypes";
import { useFormInput } from "../hooks/useFormInput";

interface NewEmployeeFormProps {
    departments: Department[];
    onAddEmployee: (departmentName: string, employee: Employee) => void;
}

// is passed the departments and the onAddEmployee callback from Page.tsx
export default function NewEmployeeForm({ departments, onAddEmployee }: NewEmployeeFormProps) {
    const firstName = useFormInput<string>("");
    const lastName = useFormInput<string>("");
    const selectedDepartment = useFormInput<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate each input using the hook's validate method with validation callbacks
        const isFirstNameValid = firstName.validate((value) => 
            value.trim().length < 3 ? "First name must be at least 3 characters long." : null
        );
        const isLastNameValid = lastName.validate(() => null); // No validation required for lastName
        const isDepartmentValid = selectedDepartment.validate((value) => 
            !value ? "Please choose a department." : null
        );

        // if any validation fails stop submission
        if (!isFirstNameValid || !isLastNameValid || !isDepartmentValid) {
            return;
        }

        // build the employee object to add to the chosen department
        const newEmployee: Employee = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
        };

        onAddEmployee(selectedDepartment.value, newEmployee);

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