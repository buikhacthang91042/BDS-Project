import express, { Router } from "express";
import authController from "../controllers/authController";
import { validateBody } from "../middlewares/validateZod";
import { RegisterSchema } from "../../schemas/registerSchema";

const router: Router = express.Router();
router.post("/register", validateBody(RegisterSchema), authController.register);
export default router;
