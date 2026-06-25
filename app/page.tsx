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

type DrawnCard = {
  image: string;
  revealed: boolean;
};

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const drawCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    setDrawnCards(
      shuffled.slice(0, 2).map((card) => ({
        image: card,
        revealed: false,
      }))
    );

    setSelectedCard(null);
  };

  const handleCardClick = (index: number) => {
    const card = drawnCards[index];

    // 裏ならめくる
    if (!card.revealed) {
      const updated = [...drawnCards];
      updated[index].revealed = true;
      setDrawnCards(updated);
      return;
    }

    // 表なら拡大
    setSelectedCard(card.image);
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
            marginTop: "20px",
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
            flexWrap: "wrap",
          }}
        >
          {drawnCards.map((card, index) => (
            <img
              key={index}
              src={
                card.revealed
                  ? card.image
                  : "/cards/back.png"
              }
              onClick={() => handleCardClick(index)}
              style={{
                width: "40vw",
                maxWidth: "300px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.4s",
                animation: "cardPop 0.8s ease forwards",
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}