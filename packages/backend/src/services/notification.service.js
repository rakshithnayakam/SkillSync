import Notification from "../models/notification.models.js";

/**
 * Create a notification for a user
 */
export const createNotification = async ({ userId, type, message, link = "", fromUser = null }) => {
  try {
    await Notification.create({ userId, type, message, link, fromUser });
  } catch {
    // Notifications should never block main operations
  }
};

/**
 * Get all notifications for a user
 */
export const getNotificationsService = async (userId) => {
  const notifications = await Notification.find({ userId })
    .populate("fromUser", "fullName username")
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = await Notification.countDocuments({ userId, isRead: false });
  return { notifications, unreadCount };
};

/**
 * Mark a single notification as read
 */
export const markAsReadService = async (notificationId, userId) => {
  await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true }
  );
};

/**
 * Mark all notifications as read
 */
export const markAllAsReadService = async (userId) => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
};

/**
 * Delete a notification
 */
export const deleteNotificationService = async (notificationId, userId) => {
  await Notification.findOneAndDelete({ _id: notificationId, userId });
};