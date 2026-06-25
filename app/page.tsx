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

  const drawCards = () => {
  console.log("CARDS:", cards);        // ←ここに書く
  console.log("SHUFFLED:", [...cards].sort(() => Math.random() - 0.5));

  const shuffled = [...cards].sort(() => Math.random() - 0.5);
   console.log("DRAWN:", shuffled.slice(0, 2));
  setDrawnCards(shuffled.slice(0, 2));
};
  return (
    <main
  style={{
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#111",
    minHeight: "100vh",
    color: "white",
  }}
>
      <h1
  style={{
    fontSize: "42px",
    letterSpacing: "3px",
  }}
>
  SPELL CARD SYSTEM
</h1>

      <button
        onClick={drawCards}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        カードを2枚引く
      </button>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
       {drawnCards.map((card, index) => (
  <div key={index}>
    <p>{card}</p>
    <img
      src={card}
      width={300}
      style={{ border: "5px solid red" }}
    />
  </div>
))}
      </div>
    </main>
  );
}