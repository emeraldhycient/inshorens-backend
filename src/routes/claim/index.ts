import express from "express";
import { createClaimCategoryController, createClaimController, getAllClaimsCategoryController, getAllClaimsController, getClaimByIdController, getClaimsByUserIdController } from "../../controllers/claim";

const router = express.Router();
router.post("/claim/category", createClaimCategoryController);
router.get("/claim/category", getAllClaimsCategoryController);
router.get("/claim/:id", getClaimByIdController);
router.get("/claim/", getAllClaimsController);
router.post("/claim/", createClaimController);
router.get("/claim/user/:id", getClaimsByUserIdController);

export default router
