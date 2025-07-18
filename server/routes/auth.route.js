import express from "express";
import { googleauth, signin, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/google-auth", googleauth);

export default router;
