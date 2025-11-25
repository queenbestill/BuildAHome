"use client";
import { useEffect, useRef } from "react";

export default function Comparator({ beforeSrc, afterSrc }) {
  const wrapper = useRef(null);
  const afterImg = useRef(null);
  const bar = useRef(null);
  const handle = useRef(null);

  const setX = (px) => {
    const w = wrapper.current;
    if (!w) return;

    const r = w.getBoundingClientRect();
    let x = Math.max(r.left, Math.min(px, r.right));
    const pct = ((x - r.left) / r.width) * 100;

    afterImg.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
    bar.current.style.left = `${pct}%`;
    handle.current.style.left = `${pct}%`;
  };

  useEffect(() => {
    const w = wrapper.current;
    let dragging = false;

    const start = (px) => {
      dragging = true;
      document.body.style.cursor = "grabbing";
      setX(px);
    };

    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setX(x);
    };

    const stop = () => {
      dragging = false;
      document.body.style.cursor = "";
    };

    const startMouse = (e) => start(e.clientX);
    const startTouch = (e) => start(e.touches[0].clientX);

    handle.current.addEventListener("mousedown", startMouse);
    bar.current.addEventListener("mousedown", startMouse);
    handle.current.addEventListener("touchstart", startTouch, { passive: true });
    bar.current.addEventListener("touchstart", startTouch, { passive: true });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", stop);

    const rect = w.getBoundingClientRect();
    setX(rect.left + rect.width / 2);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        borderRadius: "12px",
        userSelect: "none",
      }}
    >
      <img
        src={beforeSrc}
        alt="Before"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
      <img
        ref={afterImg}
        src={afterSrc}
        alt="After"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          clipPath: "inset(0 0 0 50%)",
        }}
      />

      {/* línea vertical */}
      <div
        ref={bar}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "3px",
          background: "white",
          transform: "translateX(-50%)",
          cursor: "col-resize",
          left: "50%",
        }}
      />

      {/* círculo de arrastre */}
      <div
        ref={handle}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "38px",
          height: "38px",
          borderRadius: "999px",
          background: "white",
          border: "2px solid rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          zIndex: 10,
          userSelect: "none",
        }}
      >
        <span style={{ color: "black", fontWeight: 700 }}>↔</span>
      </div>
    </div>
  );
}
