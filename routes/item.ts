import express from "express";
import { getItemByRestaurantId } from "../controllers/item.js";

const router = express.Router();

router.get('/:restaurantId', getItemByRestaurantId);


export default router