import { useState } from "react";
import type { Role } from "../../types/departmentTypes";
import { managementData } from "../../data/managementData";
import { OrganizationList } from "../OrganizationList";
import NewOrganizationForm from "../NewOrganizationForm";

export function Organization() {
    const [organization, setOrganization] = useState<Role[]>(managementData);

    return (
        <>
            <OrganizationList organization={organization} />
            <NewOrganizationForm
                organization={organization}
                onOrganizationChange={setOrganization}
            />
        </>
    );
}
