import { useEffect, useState } from "react";
import type { Role } from "../../types/departmentTypes";
import { OrganizationList } from "../OrganizationList";
import NewOrganizationForm from "../NewOrganizationForm";
import { fetchOrganization } from "../../services/organizationService";

export function Organization() {
    const [organization, setOrganization] = useState<Role[]>([]);

    useEffect(() => {
        fetchOrganization()
            .then(setOrganization)
            .catch(() => setOrganization([]));
    }, []);

    return (
        <>
            <OrganizationList organization={organization} />
            <NewOrganizationForm
                onOrganizationChange={setOrganization}
            />
        </>
    );
}
