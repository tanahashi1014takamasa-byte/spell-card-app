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

  /* ===== ドロー ===== */
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

  /* ===== 音（めくった時） ===== */
  const playSound = () => {
    const audio = new Audio("/sounds/flip.mp3");
    audio.play();
  };

  /* ===== カードクリック ===== */
  const handleCardClick = (index: number) => {
    const card = drawnCards[index];

    if (!card.revealed) {
      const updated = [...drawnCards];
      updated[index].revealed = true;
      setDrawnCards(updated);

      playSound();
      return;
    }

    setSelectedCard(card.image);
  };

  return (
    <>
      {/* 拡大表示 */}
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
        <h1 style={{ fontSize: "32px", marginBottom: 20 }}>
          SPELL CARD SYSTEM
        </h1>

        <button
          onClick={drawCards}
          style={{
            padding: "16px 36px",
            fontSize: "20px",
            fontWeight: "bold",
            background: "#8b0000",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ドロー
        </button>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {drawnCards.map((card, index) => (
            <div
              key={index}
              className="card-container"
              style={{
                width: "40vw",
                maxWidth: "300px",
                aspectRatio: "63 / 88",
              }}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`card-inner ${
                  card.revealed ? "flipped" : ""
                }`}
              >
                {/* 裏 */}
                <div className="card-back">
                  <img
                    src="/cards/back.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                {/* 表 */}
                <div className="card-front">
                  <img
                    src={card.image}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}