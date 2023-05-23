import express from "express";
import { confirmTokenController, loginController,registerController } from "../../controllers/auth";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/confirm/:token", confirmTokenController);

export default router
