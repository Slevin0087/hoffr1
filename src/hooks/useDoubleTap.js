import { useRef, useCallback } from "react";

const defaultDelay = 300;
const maxDuration = 300;

export const useDoubleTap = (callback, delay = defaultDelay) => {
  const tapCount = useRef(0);
  const timer = useRef(null);
  const touchStartTime = useRef(null);
  const onTouchStart = useCallback(() => {
    touchStartTime.current = Date.now();
  }, []);
  const onTouchEnd = useCallback(
    (event) => {
      if (!touchStartTime.current) return;
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime.current;
      if (touchDuration < maxDuration) {
        tapCount.current++;
        if (tapCount.current === 1) {
          timer.current = setTimeout(() => {
            tapCount.current = 0;
            timer.current = null;
          }, delay);
        } else if (tapCount.current === 2) {
          event.preventDefault();
          callback(event);
          clearTimeout(timer.current);
          tapCount.current = 0;
          timer.current = null;
        }
      }
      touchStartTime.current = null;
    },
    [callback, delay],
  );
  const cleanup = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    tapCount.current = 0;
    touchStartTime.current = null;
  }, []);
  return {
    onTouchStart,
    onTouchEnd,
    cleanup,
  };
};
