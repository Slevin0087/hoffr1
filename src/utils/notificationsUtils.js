import { notificationsMap } from "../Configs/NotificationsConfigs";

export const getNotificationById = (notificationId, t, params = {}) => {
  if (!notificationId) return null;

  const template = notificationsMap[notificationId];
  if (!template) return null;

  let message = t(`notifications.${template.messageKey}`);

  if (template.messageFormatter && params.value !== undefined) {
    const formatterParams = template.messageFormatter(params.value);
    message = t(`notifications.${template.messageKey}`, formatterParams);
  }

  if (typeof template.message === "function") {
    message = template.message(params.value || "");
  }

  return {
    ...template,
    message,
  };
};
