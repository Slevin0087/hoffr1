// hooks/useScrollButtons.js
import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Кастомный хук для управления скроллом с кнопками навигации
 * @param {number} scrollAmount - расстояние скролла при нажатии на кнопку (по умолчанию 300px)
 * @returns {Object} - объект с ref, состоянием кнопок и функцией скролла
 */
export const useScrollButtons = (scrollAmount = 300) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Обновление состояния кнопок
  const updateButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Проверка возможности скролла влево
    setCanScrollLeft(scrollLeft > 0);

    // Проверка возможности скролла вправо (с небольшой погрешностью)
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollRight(scrollLeft < maxScroll - 1);
  }, []);

  // Функция скролла
  const scroll = useCallback(
    (direction) => {
      const container = containerRef.current;
      if (!container) return;

      const currentScroll = container.scrollLeft;
      let newScrollLeft;

      if (direction === "left") {
        newScrollLeft = currentScroll - scrollAmount;
      } else if (direction === "right") {
        newScrollLeft = currentScroll + scrollAmount;
      } else {
        return;
      }

      // Плавный скролл
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Обновляем состояние кнопок после скролла
      setTimeout(updateButtons, 100);
    },
    [scrollAmount, updateButtons],
  );

  // Скролл в начало
  const scrollToStart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    setTimeout(updateButtons, 100);
  }, [updateButtons]);

  // Скролл в конец
  const scrollToEnd = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: maxScroll,
      behavior: "smooth",
    });

    setTimeout(updateButtons, 100);
  }, [updateButtons]);

  // Настройка обработчиков событий
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Обработчик события скролла
    const handleScroll = () => {
      updateButtons();
    };

    // Добавляем слушатель события скролла
    container.addEventListener("scroll", handleScroll);

    // Инициализация состояния кнопок
    updateButtons();

    // Наблюдатель за изменением размера контейнера
    const resizeObserver = new ResizeObserver(() => {
      updateButtons();
    });
    resizeObserver.observe(container);

    // Наблюдатель за изменением DOM (добавление/удаление элементов)
    const mutationObserver = new MutationObserver(() => {
      updateButtons();
    });
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    // Очистка
    return () => {
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateButtons]);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    scrollToStart,
    scrollToEnd,
    updateButtons, // экспортируем на случай ручного обновления
  };
};
