import { useState, useRef, useCallback } from "react";

const useSwipeActions = (options = {}) => {
  const { threshold = 50, axis = "x", initial = false } = options;
  const [isSwiped, setIsSwiped] = useState(initial);
  const start = useRef({ x: null, y: null });
  const active = useRef(false);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
    active.current = true;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!active.current) return;
    const t = e.touches[0];
    const dx = (start.current.x ?? 0) - t.clientX;
    const dy = (start.current.y ?? 0) - t.clientY;
    const delta = axis === "x" ? dx : dy;

    if (delta > threshold) setIsSwiped(true);
    else if (delta < -threshold) setIsSwiped(false);
  }, [axis, threshold]);

  const onTouchEnd = useCallback(() => {
    active.current = false;
    start.current = { x: null, y: null };
  }, []);

  const reset = useCallback(() => setIsSwiped(false), []);

  return { isSwiped, onTouchStart, onTouchMove, onTouchEnd, reset };
};

export default useSwipeActions;
