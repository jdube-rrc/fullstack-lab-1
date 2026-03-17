import { Router } from "express";
import {
    addOrganizationController,
    getOrganizationController,
} from "../controllers/organizationController";

const organizationRouter = Router();

organizationRouter.get("/organization", getOrganizationController);
organizationRouter.post("/organization", addOrganizationController);

export default organizationRouter;
