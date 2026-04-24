import { type FormEvent } from "react";
import type { Role } from "../types/departmentTypes";
import { useFormInput } from "../hooks/useFormInput";
import { createOrganizationEntry } from "../services/organizationService";
import { useAuth, useUser, SignInButton } from '@clerk/react';
import { toast } from 'sonner';

interface NewOrganizationFormProps {
    onOrganizationChange: (organization: Role[]) => void;
}

// Form component for adding new organization entries
export default function NewOrganizationForm({ onOrganizationChange }: NewOrganizationFormProps) {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();
    const firstName = useFormInput<string>("");
    const lastName = useFormInput<string>("");
    const role = useFormInput<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Clear previous error messages
        firstName.setMessage(null);
        lastName.setMessage(null);
        role.setMessage(null);

        // Build the new organization entry
        const newEntry: Role = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            role: role.value.trim(),
        };

        const token = await getToken();

        // Use the service to validate and create the entry
        const result = await createOrganizationEntry(newEntry, token);

        if (!result.success) {
            // Set error messages on the hooks
            if (result.errors.firstName) firstName.setMessage(result.errors.firstName);
            if (result.errors.lastName) lastName.setMessage(result.errors.lastName);
            if (result.errors.role) role.setMessage(result.errors.role);
            toast.error("Failed to add organization entry.");
            return;
        }

        // Update organization with the result from the service
        onOrganizationChange(result.organization);
        toast.success(`${firstName.value.trim()} ${lastName.value.trim()} added successfully!`);

        // Reset the form using the hook's reset method
        firstName.reset("");
        lastName.reset("");
        role.reset("");
    };

    if (!isSignedIn) {
        return (
            <section>
                <h2>Add New Organization Entry</h2>
                <div className="auth-required">
                    <p>You must be logged in to add a new organization entry.</p>
                    <SignInButton mode="modal">
                        <button type="button" className="auth-required-button">Log in to continue</button>
                    </SignInButton>
                </div>
            </section>
        );
    }

    return (
        <section>
            <h2>Add New Organization Entry</h2>
            <form className="new-employee-form" onSubmit={handleSubmit}>
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
                    Role: 
                    <input
                        name="role"
                        value={role.value}
                        onChange={(e) => role.setValue(e.target.value)}
                    />
                    {role.message && <span className="error-message">{role.message}</span>}
                </label>
                <hr />
                <button type="submit">Add Entry</button>
            </form>
        </section>
    );
}
