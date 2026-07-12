"use client";

import { useState } from "react";

export default function ExchangePage() {

const [chips, setChips] = useState(0);
const [isStart, setIsStart] = useState(false);
const [gotPrize, setGotPrize] = useState("");

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

{!isStart ? (
  <div
    style={{
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    <p>所持チップを入力してください</p>

    <input
  type="text"
  value={chips}
  readOnly
  style={{
    width: "120px",
    fontSize: "25px",
    textAlign: "center",
  }}
/>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 90px)",
    gap: "15px",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
  {[1,2,3,4,5,6,7,8,9].map((num) => (
    <button
  key={num}
  onClick={() => {
    setChips(Number(String(chips) + num));
  }}
  style={{
    width: "90px",
    height: "70px",
    fontSize: "30px",
  }}
>
  {num}
</button>
  ))}

  <button
    onClick={() => {
      setChips(0);
    }}
  >
    C
  </button>

  <button
    onClick={() => {
      setChips(Number(String(chips) + "0"));
    }}
  >
    0
  </button>

  <button
    onClick={() => {
      setChips(Number(String(chips).slice(0, -1)) || 0);
    }}
  >
    ←
  </button>
</div>

    <span> 枚</span>

    <br />
    <br />

    <button onClick={() => setIsStart(true)}>
      決定
    </button>
  </div>
) : (
  <>


      <p
        style={{
          textAlign: "center",
        }}
      >
        交換する景品を選んでください
      </p>

      <p
  style={{
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "20px",
  }}
>
  現在の所持チップ：{chips}枚
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

           {gotPrize === prize.name && (
  <p
    style={{
      textAlign: "center",
      fontSize: "22px",
      marginTop: "20px",
    }}
  >
    🎉 {prize.name} ゲット！おめでとうございます！
  </p>
)}
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
  setChips(chips - prize.price);
  setGotPrize(prize.name);

  const sound = new Audio("/sounds/コイン.mp3");
  sound.volume = 0.3;
  sound.play();
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

  </>
)}

    </main>
  );
}