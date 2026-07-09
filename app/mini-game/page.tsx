"use client";

import { useState } from "react";

export default function MiniGamePage() {
  const [started, setStarted] = useState(false);
  const [waniX, setWaniX] = useState(0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
    >
      {!started ? (
        <>
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "50px",
            }}
          >
            EXTRA INNING
          </h1>


          <img
  src="/images/wani⑩.png"
  alt="ワニ"
  style={{
    width: "80px",
    marginBottom: "40px",
  }}
/>

          <button
            onClick={() => setStarted(true)}
            style={{
              fontSize: "25px",
              padding: "15px 40px",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            ▶ PLAY
          </button>
        </>
      ) : (
        <>
          <h1>EXTRA INNING</h1>

          <p>GAME START</p>

          <p>
            所持金：0円
          </p>

          <img
            src="/images/wani⑩.png"
            alt="ワニ"
            style={{
              width: "150px",
              marginTop: "40px",
              transform: `translateX(${waniX}px)`,
            }}
          />

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "50px",
            }}
          >
            <button
              onClick={() => setWaniX(waniX - 20)}
              style={{
                fontSize: "30px",
                padding: "10px 25px",
              }}
            >
              ←
            </button>

            <button
              onClick={() => setWaniX(waniX + 20)}
              style={{
                fontSize: "30px",
                padding: "10px 25px",
              }}
            >
              →
            </button>
          </div>
        </>
      )}
    </main>
  );
}