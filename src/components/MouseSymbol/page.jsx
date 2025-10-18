"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../CSS/Symbol.module.css";

const MouseSymbol = () => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // ✅ Detect if the device is touch-based
    const mobileCheck =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || "ontouchstart" in window);

    setIsMobile(mobileCheck);
    if (mobileCheck) return; // Stop here for mobile/tablet

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      const circleEase = 0.15;
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * circleEase;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * circleEase;

      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${circlePos.current.x}px`;
        wrapperRef.current.style.top = `${circlePos.current.y}px`;
        wrapperRef.current.style.transform = `translate(-50%, -50%)`;
      }

      const dx = mouse.current.x - circlePos.current.x;
      const dy = mouse.current.y - circlePos.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 20;

      let moveX = dx;
      let moveY = dy;
      if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        moveX = dx * ratio;
        moveY = dy * ratio;
      }

      const dotEase = 0.25;
      dotPos.current.x += (moveX - dotPos.current.x) * dotEase;
      dotPos.current.y += (moveY - dotPos.current.y) * dotEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className={styles.symbolWrapper} ref={wrapperRef}>
      <div className={styles.symbol}>
        <div className={styles.symbolDot} ref={dotRef}></div>
      </div>
    </div>
  );
};

export default MouseSymbol;
