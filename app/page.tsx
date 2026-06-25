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
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
  setSelectedCard(prev => (prev === card ? null : card));
};

  const drawCards = () => {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  setDrawnCards(shuffled.slice(0, 2));
  setSelectedCard(null);
};

  return (
  <>
    {selectedCard && (
      <div
        onClick={() => setSelectedCard(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <img
          src={selectedCard}
          style={{
            width: "85vw",
            maxWidth: "500px",
            borderRadius: "12px",
          }}
        />
      </div>
    )}

    <main
      style={{
        padding: 20,
        textAlign: "center",
        background: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>SPELL CARD SYSTEM</h1>

      <button onClick={drawCards}>カードを2枚引く</button>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {drawnCards.map((card, index) => (
          <img
            key={index}
            src={card}
            onClick={() => handleCardClick(card)}
            style={{
              width: "40vw",
              maxWidth: "300px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          />
        ))}
      </div>
    </main>
  </>
);
}