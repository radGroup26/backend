import express from "express";
import { createItem, deleteItem, editItem, getItemByRestaurantId } from "../controllers/item.js";
const router = express.Router();
router.get('/:restaurantId', getItemByRestaurantId);
router.post('/create', createItem);
router.post('/edit', editItem);
router.post('/delete', deleteItem);
export default router;
