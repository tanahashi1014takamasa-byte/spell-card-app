"use client";

import { useState } from "react";

const cards = [
  "/cards/カース.png",
  "/cards/グングニル.png",
  "/cards/サムフリック.png",
  "/cards/ショットガン.png",
  "/cards/スチール.png",
  "/cards/トマソン.png",
  "/cards/ナパームガール.png",
  "/cards/ノーリスト.png",
  "/cards/パーム・ストライク.png",
  "/cards/ファントム.png",
  "/cards/ブラインド.png",
  "/cards/ブラックチケット.png",
  "/cards/マグネットフォース.png",
];

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
  setSelectedIndex(prev => (prev === index ? null : index));
};

  const drawCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, 2));
    setSelectedIndex(null);
  };

  return (
    <main style={{ padding: 20, textAlign: "center", background: "#111", minHeight: "100vh", color: "white" }}>
      <h1>SPELL CARD SYSTEM</h1>

      <button onClick={drawCards}>カードを2枚引く</button>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20 }}>
        {drawnCards.map((card, index) => (
          <div key={index}>
            <img
              src={card}
              width={300}
              onClick={() => handleCardClick(index)}
              style={{
  borderRadius: "12px",
  boxShadow: selectedIndex === index
    ? "0 0 40px rgba(255,255,255,0.8)"
    : "0 0 20px rgba(255,255,255,0.3)",

  transition: "0.3s",
  cursor: "pointer",

  position: selectedIndex === index ? "fixed" : "relative",
  top: selectedIndex === index ? "50%" : "auto",
  left: selectedIndex === index ? "50%" : "auto",
  transform: selectedIndex === index
    ? "translate(-50%, -50%) scale(1.5)"
    : "scale(1)",

  zIndex: selectedIndex === index ? 9999 : 1,
}}
            />
          </div>
        ))}
      </div>
    </main>
  );
}