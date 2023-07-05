import express from "express";
import { createCoverage, getAllCoverage, getCoverageById, updateCoverage } from "../../controllers/coverage";

const router = express.Router();
router.post("/coverage", createCoverage);
router.get("/coverage", getAllCoverage);
router.get("/coverage/:id", getCoverageById)
router.patch("/coverage/:id", updateCoverage);

export default router
