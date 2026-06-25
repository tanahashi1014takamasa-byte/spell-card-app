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

  const drawCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, 2));
    setSelectedCard(null);
  };

  const handleCardClick = (card: string) => {
    setSelectedCard((prev) => (prev === card ? null : card));
  };

  return (
    <>
      {selectedCard && (
        <div
          onClick={() => setSelectedCard(null)}
          style={{
            position: "fixed",
            inset: 0,
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

        <button
  onClick={drawCards}
  style={{
    padding: "16px 32px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg, #333, #111)",
    border: "2px solid #666",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 0 15px rgba(255,255,255,0.1)",
  }}
  onMouseDown={(e) => {
    (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.95)";
  }}
  onMouseUp={(e) => {
    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
  }}
>
  なんとかなれーッ！！
</button>

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
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}