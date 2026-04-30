import "./Notifications.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveNotification } from "../../../../../Store/slices/ui/selectors";
import { getNotificationById } from "../../../../../utils/notificationsUtils";
import { useEffect } from "react";
import {
  clearCurrentNotification,
  showNextNotification,
} from "../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";
import { selectCurrentBestPoints } from "../../../../../Store/slices/game/selectors/points";
import { notifications_ids } from "../../../../../Configs/NotificationsConfigs";

function Notifications() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bestPoints = useSelector(selectCurrentBestPoints);
  const activeNotification = useSelector(selectActiveNotification);
  console.log("Notifications activeNotification", activeNotification);

  const notificationData = activeNotification
    ? getNotificationById(activeNotification.id, t, {
        value: activeNotification.params?.value,
      })
    : getNotificationById(notifications_ids.points_record, t, {
        value: bestPoints,
      });

  useEffect(() => {
    if (!activeNotification) return;

    if (notificationData?.duration === null) return;

    const duration = notificationData?.duration || 3000;
    const timer = setTimeout(() => {
      dispatch(clearCurrentNotification());
      dispatch(showNextNotification());
    }, duration);

    return () => clearTimeout(timer);
  }, [activeNotification, notificationData, dispatch]);

  if (!notificationData) return null;

  const { message, type, icon } = notificationData;

  return (
    <AnimatePresence>
      <motion.div
        className={`notifications-container ${type}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <span className="notification-icon">{icon}</span>
        <span className="notification-message">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export default Notifications;
