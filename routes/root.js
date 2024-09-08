import express from "express";
import path from "node:path";
import { dirname } from "../lib/helper.js";
const router = express.Router();
router.get('/', (req, res) => {
    res.sendFile(path.join(dirname(import.meta.url), '../views/index.html'));
});
export default router;
