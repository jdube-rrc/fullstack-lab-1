import { Router } from "express";
import {
    addOrganizationController,
    getOrganizationController,
} from "../controllers/organizationController";
import { requireAuth } from "../middleware/requireAuth";

const organizationRouter = Router();

organizationRouter.get("/organization", getOrganizationController);
organizationRouter.post("/organization", requireAuth, addOrganizationController);

export default organizationRouter;
