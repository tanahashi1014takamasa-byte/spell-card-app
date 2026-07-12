"use client";

import { useState } from "react";

export default function ExchangePage() {

const [chips, setChips] = useState(0);
    
  const prizes = [
    {
      name: "アクリルスタンド１",
      price: 100,
      image: "/images/A.png",
    },
    {
      name: "アクリルスタンド２",
      price: 150,
      image: "/images/B.png",
    },
        {
      name: "アクリルスタンド３",
      price: 200,
      image: "/images/C.png",
    },
        {
      name: "アクリルスタンド４",
      price: 200,
      image: "/images/D.png",
    },
        {
      name: "アクリルスタンド５",
      price: 300,
      image: "/images/E.png",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        🎁 景品交換
      </h1>

<div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <p>現在の所持チップ</p>

  <input
    type="number"
    value={chips}
    onChange={(e) => setChips(Number(e.target.value))}
    style={{
      width: "100px",
      fontSize: "20px",
      textAlign: "center",
    }}
  />

  <span> 枚</span>
</div>


      <p
        style={{
          textAlign: "center",
        }}
      >
        交換する景品を選んでください
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {prizes.map((prize) => (
          <div
            key={prize.name}
            style={{
              width: "300px",
              background: "#222",
              border: "2px solid white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2>{prize.name}</h2>

            <img
  src={prize.image}
  alt={prize.name}
  style={{
    width: "150px",
    height: "150px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  }}
/>

            <p>
              必要チップ：{prize.price}枚
            </p>

            <button
  onClick={() => {
    if (chips >= prize.price) {
      alert(`${prize.name} と交換できます！`);
    } else {
      alert("チップが足りません！");
    }
  }}
>
  交換する
</button>
          </div>
        ))}
      </div>
    </main>
  );
}