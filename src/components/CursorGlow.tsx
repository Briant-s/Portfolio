import { useEffect, useRef } from "react";
import classes from "./CursorGlow.module.css";

/**
 * A large, blurred gradient blob that tracks the cursor with no delay —
 * positioned directly on each pointermove event.
 *
 * Fixed, behind content, pointer-events: none, aria-hidden — purely decorative.
 */
export function CursorGlow() {
  const positionerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = positionerRef.current;
      if (el) {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden className={classes.wrapper}>
      <div ref={positionerRef} className={classes.positioner}>
        <div className={classes.glow} />
      </div>
    </div>
  );
}
