"use client";

import { useState } from "react";

export default function MiniGamePage() {
  const [chips, setChips] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        textAlign: "center",
        paddingTop: "100px",
      }}
    >
      <h1>🎆 夏祭りミニゲーム</h1>

      <p>
        獲得チップ数を入力してください
      </p>

      <input
        type="number"
        value={chips}
        onChange={(e) => setChips(e.target.value)}
        style={{
          fontSize: "24px",
          width: "120px",
          textAlign: "center",
        }}
      />

      <span style={{ fontSize: "24px" }}>
        枚
      </span>

      <br /><br />

      <button
  onClick={() => setIsEntered(true)}
  style={{
    fontSize: "24px",
    padding: "10px 30px",
  }}
>
  入場する
</button>
    </main>
  );
}