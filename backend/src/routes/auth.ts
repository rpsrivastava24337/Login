import { Router } from "express";
import { login } from "../controllers/authController"; // ✅ Correct import

const router = Router();

router.post("/login", (req, res, next) => {
	login(req, res).catch(next); // Properly handle async errors
});

export default router;
