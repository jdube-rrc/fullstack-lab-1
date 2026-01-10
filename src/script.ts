import type { Department } from "./types/departmentTypes.js";
import { departments } from "./data/employeeData.js";

displayCurrentDate();
populateEmployeeList(departments);

function displayCurrentDate(): void {
    const date = new Date();
    const formattedDate = date.getFullYear();
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.textContent = `Copyright Pixell River Financial ${formattedDate}`;
    }
};

function populateEmployeeList(departments: Department[]): void {
    const container = document.getElementById("main");
    if (!container) return;

    const list: HTMLUListElement = document.createElement("ul");

    departments.forEach(dept => {
        dept.employees.forEach(emp => {
            const li: HTMLLIElement = document.createElement("li");
            const fullName: string = `${emp.firstName} ${emp.lastName}`;
            
            const nameSpan: HTMLSpanElement = document.createElement("span");
            nameSpan.className = "employee-name";
            nameSpan.textContent = fullName;
            
            const deptSpan: HTMLSpanElement = document.createElement("span");
            deptSpan.className = "department-name";
            deptSpan.textContent = dept.name;
            
            li.appendChild(nameSpan);
            li.appendChild(deptSpan);
            list.appendChild(li);
        });
    });

    container.replaceChildren(list);
}