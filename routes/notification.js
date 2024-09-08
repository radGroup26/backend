const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification");

router.get("/", getAllNotifications);
router.post("/add", addNotification);
router.put("/save/:id", updateNotification);
router.delete("/delete/:id", deleteNotification);

module.exports = router;
