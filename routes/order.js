import express from "express";
import { getOrderByTableId, createOrder, deleteOrder, finishOrder, declineOrder } from "../controllers/order.js";
const router = express.Router();
router.get('/:tableId', getOrderByTableId);
router.post('/create', createOrder);
router.post('/delete', deleteOrder);
router.post('/finish', finishOrder);
router.post('/decline', declineOrder);
export default router;
