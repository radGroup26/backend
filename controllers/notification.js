const Notification = require("../models/Notification");

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new notification
exports.addNotification = async (req, res) => {
  const { title, message, createdAt } = req.body;
  const notification = new Notification({
    title,
    message,
    createdAt,
  });

  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a notification
exports.updateNotification = async (req, res) => {
  try {
    const { title, message, createdAt } = req.body;
    const notification = await Notification.findById(req.params.id);

    if (notification) {
      notification.title = title;
      notification.message = message;
      notification.createdAt = createdAt;
      const updatedNotification = await notification.save();
      res.json(updatedNotification);
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE notification by id
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
