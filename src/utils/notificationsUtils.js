import { notifications_ids, notificationsMap } from "../Configs/NotificationsConfigs";

export const getNotificationById = (notificationId, t, params = {}) => {
  console.log('notificationId: ', notificationId);
  if (!notificationId) return null;

  const template = notificationsMap[notificationId];
  if (!template) return null;

  let message = t(`notifications.${template.messageKey}`);

  if (template.messageFormatter) {
    const formatterParams = template.messageFormatter(params);
    message = t(`notifications.${template.messageKey}`, formatterParams);
  }

  if (typeof template.message === "function") {
    message = template.message(params.value || "");
  }

  return {
    ...template,
    message,
    params,
    isCombo: template.id === notifications_ids.combo_increment,
  };
};
