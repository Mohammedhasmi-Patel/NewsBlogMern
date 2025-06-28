import express from "express";
import { signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);

export default router;
