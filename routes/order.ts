import express from "express";
import {  getOrderByTableId  } from "../controllers/order.js";

const router = express.Router();

router.get('/:tableId', getOrderByTableId);


export default router