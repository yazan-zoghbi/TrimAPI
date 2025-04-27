import express from "express";
import { redirectHandler } from "../controllers/redirection.js";

const router = express.Router();

router.get("/:id", redirectHandler);

export default router;
