import express from "express";
import { signup, signin } from "../controller/auth.controller.js";

const router = express.Router();

// add auth routes

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
