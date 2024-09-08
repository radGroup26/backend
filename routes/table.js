import express from "express";
import { getTablesByRestaurantId } from "../controllers/table.js";
const router = express.Router();
router.get('/:restaurantId/tables', getTablesByRestaurantId);
export default router;
