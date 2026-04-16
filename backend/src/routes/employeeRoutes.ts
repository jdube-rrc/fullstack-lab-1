import { Router } from "express";
import {
    addEmployeeController,
    getDepartmentsController,
} from "../controllers/employeeController";
import { requireAuth } from "../middleware/requireAuth";

const employeeRouter = Router();

employeeRouter.get("/departments", getDepartmentsController);
employeeRouter.post("/departments/:departmentName/employees", requireAuth, addEmployeeController);

export default employeeRouter;
