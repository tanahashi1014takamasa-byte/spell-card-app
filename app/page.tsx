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

  const flipSound = () => {
    const audio = new Audio("/sounds/flip.mp3");
    audio.volume = 0.7;
    audio.play();
  };

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

    if (!card.revealed) {
      flipSound();

      const updated = [...drawnCards];
      updated[index].revealed = true;
      setDrawnCards(updated);
      return;
    }

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
        <h1
  style={{
    fontFamily: "var(--font-cinzel)",
    fontSize: "38px",
    letterSpacing: "3px",
    color: "#f5f5f5",
    marginBottom: "20px",
    textShadow: "0 0 10px rgba(255,255,255,0.15)",
  }}
>
  SPELL CARD SYSTEM
</h1>

        <button
  onClick={drawCards}
  style={{
    padding: "18px 42px",

    fontSize: "22px",
    fontWeight: "900",
    color: "#fff",

    background:
      "linear-gradient(180deg, #ff1a1a 0%, #8b0000 50%, #250000 100%)",

    border: "2px solid #ff5555",

    borderRadius: "14px",

    cursor: "pointer",

    marginTop: "20px",

    boxShadow:
      "0 0 10px rgba(255,0,0,0.6), 0 0 30px rgba(120,0,0,0.5)",

    textShadow:
      "0 0 6px rgba(255,255,255,0.4), 0 0 12px rgba(255,0,0,0.8)",

    transition: "all 0.2s ease",
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = "scale(0.96)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = "scale(1)";
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
            <div
              key={index}
              className="card-container"
              style={{
                width: "40vw",
                maxWidth: "300px",
                aspectRatio: "63 / 88",
                animation: "cardPop 0.8s ease forwards",
              }}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`card-inner ${
                  card.revealed ? "flipped" : ""
                }`}
              >
                <img
                  src="/cards/back.png"
                  className="card-back"
                />

                <img
                  src={card.image}
                  className="card-front"
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/yah.png"
            alt="yah"
            style={{
              width: "220px",
              height: "auto",
            }}
          />
        </div>
      </main>
    </>
  );
}