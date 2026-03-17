import { Router } from "express";
import {
    addEmployeeController,
    getDepartmentsController,
} from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.get("/departments", getDepartmentsController);
employeeRouter.post("/departments/:departmentName/employees", addEmployeeController);

export default employeeRouter;
