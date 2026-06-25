"use client";

import { useState } from "react";

/* ===== カードデータ ===== */
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

/* ===== レア管理（拡張可能）===== */
const cardMeta: Record<string, { rarity?: "rare" }> = {
  "/cards/パーム・ストライク.png": { rarity: "rare" },
};

/* ===== 型 ===== */
type DrawnCard = {
  image: string;
  revealed: boolean;
};

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

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
    setLog([]);
  };

  /* ===== カードクリック ===== */
  const handleCardClick = (index: number) => {
    const card = drawnCards[index];

    if (!card.revealed) {
      revealCard(index);
      return;
    }

    setSelectedCard(card.image);
  };

  /* ===== カード開示 ===== */
  const revealCard = (index: number) => {
    setDrawnCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, revealed: true } : card
      )
    );

    const card = drawnCards[index];

    setLog((prev) => [
      `▶ ${card.image.split("/").pop()?.replace(".png", "")} 発動！`,
      ...prev,
    ]);
  };

  /* ===== レア判定 ===== */
  const isRare = (image: string, revealed: boolean) =>
    cardMeta[image]?.rarity === "rare" && revealed;

  return (
    <>
      {/* ===== 拡大表示 ===== */}
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
        {/* ===== タイトル ===== */}
        <h1
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "38px",
            letterSpacing: "3px",
            marginBottom: "20px",
            textShadow: "0 0 10px rgba(255,255,255,0.15)",
          }}
        >
          SPELL CARD SYSTEM
        </h1>

        {/* ===== ドローボタン ===== */}
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
          }}
        >
          なんとかなれーッ！！
        </button>

        {/* ===== カード表示 ===== */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {drawnCards.map((card, index) => {
            const rare = isRare(card.image, card.revealed);

            return (
              <div
                key={index}
                className={`card-container ${
                  rare ? "rare-card" : ""
                }`}
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
            );
          })}
        </div>

        {/* ===== ログ ===== */}
        <div style={{ marginTop: 40, textAlign: "left", maxWidth: 500, marginInline: "auto" }}>
          {log.map((l, i) => (
            <div key={i} style={{ opacity: 0.8, marginBottom: 6 }}>
              {l}
            </div>
          ))}
        </div>

        {/* ===== 下画像 ===== */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/yah.png"
            style={{ width: "220px", height: "auto" }}
          />
        </div>
      </main>
    </>
  );
}