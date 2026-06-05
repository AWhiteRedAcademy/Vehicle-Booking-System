import { authFetch } from "./Auth.js";

function normalizeArray(data) {
  const normalizedData = typeof data === "string" ? JSON.parse(data) : data;
  return Array.isArray(normalizedData) ? normalizedData : [];
}

function normalizeNotification(notification) {
  return {
    notificationId: notification.notificationId || notification.notificationid || 0,
    userId: notification.userId || notification.userid || 0,
    title: notification.title || "Notification",
    message: notification.message || "",
    type: notification.type || "General",
    entityType: notification.entityType || notification.entitytype || null,
    entityId: notification.entityId || notification.entityid || null,
    isRead: Boolean(notification.isRead ?? notification.isread),
    createdAtUtc: notification.createdAtUtc || notification.createdatutc || "",
    readAtUtc: notification.readAtUtc || notification.readatutc || null,
  };
}

export const getNotifications = async (take = 25) => {
  const data = await authFetch(`/api/Notifications/current?take=${take}`, {
    method: "GET",
  });

  return normalizeArray(data).map(normalizeNotification);
};

export const getUnreadNotificationCount = async () => {
  const data = await authFetch("/api/Notifications/current/unread-count", {
    method: "GET",
  });

  const normalizedData = typeof data === "string" ? JSON.parse(data) : data;
  return normalizedData.unreadCount || normalizedData.UnreadCount || 0;
};

export const markNotificationAsRead = async (notificationId) => {
  return authFetch(`/api/Notifications/${notificationId}/read`, {
    method: "PATCH",
  });
};

export const markAllNotificationsAsRead = async () => {
  return authFetch("/api/Notifications/current/read-all", {
    method: "PATCH",
  });
};
