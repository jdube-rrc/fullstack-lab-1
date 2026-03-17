import type { Request, Response } from "express";
import { createEmployee, listDepartments } from "../services/employeeService";

export function getDepartmentsController(_req: Request, res: Response): void {
    res.json(listDepartments());
}

// Validates the request body and adds a new employee to the specified department if valid
export function addEmployeeController(req: Request, res: Response): void {
    const departmentParam = req.params.departmentName;
    const departmentName = Array.isArray(departmentParam)
        ? departmentParam[0] ?? ""
        : departmentParam ?? "";
    const firstName = typeof req.body?.firstName === "string" ? req.body.firstName : "";
    const lastName = typeof req.body?.lastName === "string" ? req.body.lastName : "";

    const result = createEmployee(departmentName, { firstName, lastName });

    if (!result.success) {
        res.status(400).json({ errors: result.errors });
        return;
    }

    res.status(201).json({ departments: result.departments });
}
