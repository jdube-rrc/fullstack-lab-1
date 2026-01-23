import { useState, type FormEvent } from "react";
import type { Employee, Department } from "../types/departmentTypes";

interface NewEmployeeFormProps {
    departments: Department[];
    onAddEmployee: (departmentName: string, employee: Employee) => void;
}

// is passed the departments and the onAddEmployee callback from Page.tsx
export default function NewEmployeeForm({ departments, onAddEmployee }: NewEmployeeFormProps) {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]); // clear old validation messages

        // stores validation messages in an array so we can show all at once
        const validationMessages: string[] = [];
        if (firstName.trim().length < 3) {
            validationMessages.push("First name must be at least 3 characters long.");
        }
        if (!selectedDepartment) {
            validationMessages.push("Please choose a department.");
        }

        if (validationMessages.length > 0) {
            setErrors(validationMessages);
            return;
        }

        // build the employee object to add to the chosen department
        const newEmployee: Employee = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        };

        onAddEmployee(selectedDepartment, newEmployee);

        // reset the form
        setFirstName("");
        setLastName("");
        setSelectedDepartment("");
    };

    return (
        <section>
            <h2>Add New Employee</h2>
            {errors.length > 0 && (
                <ul className="error-messages">
                    {errors.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
            <form className="new-employee-form" onSubmit={handleSubmit}>
                {/* when the user types it will update state of firstName and lastName */}
                <label>
                    First Name:
                    <input
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    {/* when the user selects a department it will update state of selectedDepartment */}
                    Department: 
                    <select
                        name="department"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        {/* options for departments */}
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                            <option key={dept.name} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </label>
                <hr />
                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}