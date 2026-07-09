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
        overflow: "hidden",
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
              width: "150px",
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
          <h1
            style={{
              position: "absolute",
              top: "20px",
            }}
          >
            EXTRA INNING
          </h1>

          <p
            style={{
              position: "absolute",
              top: "80px",
            }}
          >
            所持金：0円
          </p>

          {/* 左右キー */}
          <div
            style={{
              position: "fixed",
              bottom: "100px",
              left: "0",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            <button
              onClick={() => setWaniX(waniX - 20)}
              style={{
                width: "90px",
                height: "60px",
                fontSize: "35px",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              ◀
            </button>

            <button
              onClick={() => setWaniX(waniX + 20)}
              style={{
                width: "90px",
                height: "60px",
                fontFamily: "monospace",
                fontSize: "35px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </div>

          {/* ワニ */}
          <img
            src="/images/wani⑩.png"
            alt="ワニ"
            style={{
              width: "70px",
              position: "fixed",
              bottom: "20px",
              transform: `translateX(${waniX}px)`,
            }}
          />
        </>
      )}
    </main>
  );
}