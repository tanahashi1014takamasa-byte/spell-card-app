"use client";

import { useState, useEffect } from "react";

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
const [zoomImage, setZoomImage] = useState<string | null>(null);
const [isZooming, setIsZooming] = useState(false);

const RARE_CARD = "/cards/パーム・ストライク.png";

  useEffect(() => {
    const bgm = new Audio("/sounds/Neraiuchi.mp3");
    bgm.loop = true;
    bgm.volume = 0.3;

    const startBgm = () => {
      bgm.play().catch(() => {});
    };

    document.addEventListener("click", startBgm, { once: true });

    return () => {
      bgm.pause();
    };
  }, []);

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

  setZoomImage(null);
  setIsZooming(false);
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

     // ★ここが「間」
  setIsZooming(true);

  setTimeout(() => {
    setZoomImage(card.image);
    setIsZooming(false);
  }, 150);
};

 return (
  <>
    {zoomImage && (
  <div
    onClick={() => setZoomImage(null)}
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
      src={zoomImage}
      style={{
        width: "85vw",
        maxWidth: "500px",
        borderRadius: "12px",

        // ★ここが“ヌルっと感”
        animation: "zoomIn 0.2s ease-out",
      }}
    />
  </div>
)}

    {/* ★ここに追加 */}
    {isZooming && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.95)",
          zIndex: 9998,
        }}
      />
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
  SPELL CARD
</h1>

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
            <div
              key={index}
              className={`card-container ${card.image === RARE_CARD && card.revealed ? "rare-card" : ""}`}
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