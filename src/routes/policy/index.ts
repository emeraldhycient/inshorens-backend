import express from "express";
import { createPolicy, getAllPolicy, getPolicyById, updatePolicy } from "../../controllers/policy";

const router = express.Router();
router.post("/policy", createPolicy);
router.get("/policy", getAllPolicy);
router.get("/policy/:id", getPolicyById)
router.patch("/policy", updatePolicy);

export default router
