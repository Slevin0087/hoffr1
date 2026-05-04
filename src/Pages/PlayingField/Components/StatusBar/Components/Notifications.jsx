import "./Notifications.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveNotification } from "../../../../../Store/slices/ui/selectors";
import { getNotificationById } from "../../../../../utils/notificationsUtils";
import { useEffect, useMemo } from "react";
import { clearCurrentNotification } from "../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";
import {
  COMBO_BONUS_TIMES,
  COMBO_WINDOW,
} from "../../../../../Configs/ComboConfigs";
import { selectCurrentBestPoints } from "../../../../../Store/slices/game/selectors/points";
import { notifications_ids } from "../../../../../Configs/NotificationsConfigs";

function Notifications() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeNotification = useSelector(selectActiveNotification);
  const bestPoints = useSelector(selectCurrentBestPoints);
  const notificationData = useMemo(
    () =>
      activeNotification
        ? getNotificationById(
            activeNotification.id,
            t,
            activeNotification.params || {},
          )
        : getNotificationById(notifications_ids.best_points, t, {
            value: bestPoints === null ? 0 : bestPoints,
          }),
    [activeNotification, t, bestPoints],
  );

  useEffect(() => {
    if (!activeNotification || !notificationData) return;

    if (notificationData.duration === null) return;

    const duration = notificationData.duration || 3000;
    const timer = setTimeout(() => {
      dispatch(clearCurrentNotification());
    }, duration);

    return () => clearTimeout(timer);
  }, [activeNotification, notificationData, dispatch, bestPoints]);

  if (!notificationData) return null;

  const { message, type, icon, isCombo, params } = notificationData;

  const animationKey = activeNotification?.createdAt
    ? `${activeNotification.id}-${activeNotification.createdAt}`
    : activeNotification?.id || "empty";

  console.log("params.value === COMBO_BONUS_TIMES[1]: ", COMBO_BONUS_TIMES[1]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        className="notifications-container"
        style={
          isCombo
            ? { color: params.value === COMBO_BONUS_TIMES[1] ? "red" : "green" }
            : {}
        }
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.1 }}
      >
        <div className={`notification-item ${type}`}>
          {icon && <span className="notification-icon">{icon}</span>}
          <span className="notification-message">{message}</span>
        </div>
        {isCombo && (
          <motion.div
            className="combo-timer"
            style={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: notificationData.duration / 1000 }}
          ></motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Notifications;
