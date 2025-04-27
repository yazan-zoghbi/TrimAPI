import express from "express";
import { generateURL, getURL } from "../controllers/url.js";

const router = express.Router();

router.post("/submit", generateURL);
router.get("/:hash", getURL);


export default router;
