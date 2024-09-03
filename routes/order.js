import express from "express";
import { getOrderByTableId, createOrder } from "../controllers/order.js";
const router = express.Router();
router.get('/:tableId', getOrderByTableId);
router.post('/create', createOrder);
export default router;
