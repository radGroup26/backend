import express from "express";
import { createItem, getItemByRestaurantId } from "../controllers/item.js";
const router = express.Router();
router.get('/:restaurantId', getItemByRestaurantId);
router.post('/create', createItem);
export default router;
