import type { Role } from "../../types/departmentTypes";
import { managementData } from "../../data/managementData";

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

export function Organization() {
    return (
        <div id="main">
            <ul className="employee-list">
                {managementData.map((person, index) => (
                    <RoleItem
                        key={`${person.firstName}-${person.lastName}-${index}`}
                        person={person}
                    />
                ))}
            </ul>
        </div>
    );
}
