import express from "express";
import { createPlan, getUserPlans, getPlanById, updatePlan } from "../../controllers/plan";

const router = express.Router();
router.post("/plan", createPlan);
router.get("/plan", getUserPlans);
router.get("/plan/:id", getPlanById)
router.patch("/plan/:id", updatePlan);

export default router
