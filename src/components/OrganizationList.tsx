import type { Role } from "../types/departmentTypes";

interface RoleItemProps {
    person: Role;
}

function RoleItem({ person }: RoleItemProps) {
    const fullName = `${person.firstName} ${person.lastName}`;

    return (
        <li>
            <span className="employee-name">{fullName}</span>
            <span className="department-name">{person.role}</span>
        </li>
    );
}

interface OrganizationListProps {
    organization: Role[];
}

export function OrganizationList({ organization }: OrganizationListProps) {
    return (
        <div id="main">
            <ul className="employee-list">
                {organization.map((person, index) => (
                    <RoleItem
                        key={`${person.firstName}-${person.lastName}-${index}`}
                        person={person}
                    />
                ))}
            </ul>
        </div>
    );
}
