import { useState, useEffect } from "react";

/**
 * Узкий вьюпорт или prefers-reduced-motion: отключаем тяжёлые параллакс/loop-анимации
 * (на iOS часто «двоятся» из-за скролл-трансформов и резиновой прокрутки).
 */
export function useLightMotion() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLight(narrow || reduce);
    };
    check();
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqNarrow.addEventListener("change", check);
    mqReduce.addEventListener("change", check);
    return () => {
      mqNarrow.removeEventListener("change", check);
      mqReduce.removeEventListener("change", check);
    };
  }, []);

  return light;
}
