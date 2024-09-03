import express from "express";
import { getMenuByRestaurantId } from "../controllers/menu.js";
const router = express.Router();
router.get('/:restaurantId', getMenuByRestaurantId);
export default router;
