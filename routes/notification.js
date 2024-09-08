import express from "express";
import {
  getAllNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.js";
const router = express.Router();

router.get("/", getAllNotifications);

router.post("/add", addNotification);

router.put("/save/:id", updateNotification);

router.delete("/delete/:id", deleteNotification);

export default router;
