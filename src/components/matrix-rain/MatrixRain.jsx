import React, { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const chars = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+~}{|:?><''`;
    const getFontSize = (screenWidth) => (screenWidth <= 768 ? 10 : 14);

    let width = 0;
    let height = 0;
    let fontSize = 14;
    let columns = 0;
    let drops = [];

    function resetRain() {
      width = window.innerWidth;
      height = window.innerHeight;
      fontSize = getFontSize(width);
      columns = Math.floor(width / fontSize);

      canvas.width = width;
      canvas.height = height;

      // Start each column at a random row so the effect is already "in progress".
      drops = Array.from(
        { length: columns },
        () => Math.floor(Math.random() * (height / fontSize))
      );
    }

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#3b51f7";
      ctx.font = `600 ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    resetRain();
    window.addEventListener("resize", resetRain);

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resetRain);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
