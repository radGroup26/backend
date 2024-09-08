import express from "express";
import { getTables, createTable, editTable, deleteTable } from "../controllers/table.js";
const router = express.Router();
router.get('/:restaurantId', getTables);
router.post('/create', createTable);
router.post('/edit', editTable);
router.post('/delete', deleteTable);
export default router;
