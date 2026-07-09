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
          <h1>EXTRA INNING</h1>

          <p>GAME START</p>

          <p>
            所持金：0円
          </p>

          

        <div
  style={{
    marginTop: "100px",
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
      fontSize: "35px",
      fontFamily: "monospace",
      cursor: "pointer",
    }}
  >
    ▶
  </button>
</div>

<img
  src="/images/wani⑩.png"
  alt="ワニ"
  style={{
    width: "70px",
    marginTop: "250px",
    transform: `translateX(${waniX}px)`,
  }}
/>

        </>
      )}
    </main>
  );
}