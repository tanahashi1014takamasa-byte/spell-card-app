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
  "/cards/ボルテックス.png",
  "/cards/マグネットフォース.png",
];

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<string[]>([]);

  const drawCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, 2));
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>スペルカードアプリ</h1>

      <button onClick={drawCards}>
        カードを2枚引く
      </button>

      <div style={{ marginTop: "20px" }}>
        {drawnCards.map((card, index) => (
          <img
            key={index}
            src={card}
            alt="スペルカード"
            width="300"
            style={{ marginRight: "20px" }}
          />
        ))}
      </div>
    </main>
  );
}