"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../CSS/Symbol.module.css";

const MouseSymbol = () => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      // === Smooth circle movement ===
      const circleEase = 0.15;
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * circleEase;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * circleEase;

      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${circlePos.current.x}px`;
        wrapperRef.current.style.top = `${circlePos.current.y}px`;
        wrapperRef.current.style.transform = `translate(-50%, -50%)`;
      }

      // === Inner dot movement toward mouse, but constrained to circle ===
      const dx = mouse.current.x - circlePos.current.x;
      const dy = mouse.current.y - circlePos.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 20; // radius for inner dot movement

      // Clamp movement to inside circle
      let moveX = dx;
      let moveY = dy;
      if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        moveX = dx * ratio;
        moveY = dy * ratio;
      }

      // Smooth movement of dot
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

  return (
    <div className={styles.symbolWrapper} ref={wrapperRef}>
      <div className={styles.symbol}>
        <div className={styles.symbolDot} ref={dotRef}></div>
      </div>
    </div>
  );
};

export default MouseSymbol;
