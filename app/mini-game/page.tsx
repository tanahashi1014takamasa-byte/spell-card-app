"use client";

import { useState, useEffect, useRef } from "react";

export default function MiniGamePage() {
  const [started, setStarted] = useState(false);
  const [waniX, setWaniX] = useState(0);
  const [money, setMoney] = useState(0);
  const [time, setTime] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showNishida, setShowNishida] = useState(false);

  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const [fallingItems, setFallingItems] = useState<
    {
      id: number;
      image: string;
      x: number;
      y: number;
    }[]
  >([]);

  useEffect(() => {
  const timer = setInterval(() => {
    setFallingItems((prev) =>
      prev.map((item) => ({
        ...item,
        y: item.y + 5,
      }))
    );

setFallingItems((prev) =>
  prev.filter((item) => {
    const hit =
      item.y > window.innerHeight - 250 &&
      Math.abs(item.x - (waniX + 150)) < 100;

    if (hit) {
      if (item.image === "/images/10.png") {
        setMoney((m) => m + 10);
      } else {
        setMoney((m) => m - 10);
      }
    }

    return !hit;
  })
);

  }, 50);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const spawnTimer = setInterval(() => {
    const random = Math.random();

let image = "/images/gum.png";

if (random < 0.4) {
  image = "/images/gum.png";
} else if (random < 0.7) {
  image = "/images/beer.png";
} else if (random < 0.95) {
  image = "/images/tabaco.png";
} else {
  image = "/images/10.png";
}




const newItem = {
  id: Date.now(),
  image,
  x: Math.floor(Math.random() * 300),
  y: 0,
};

    setFallingItems((prev) => [
      ...prev,
      newItem,
    ]);
  }, 1000);

  return () => clearInterval(spawnTimer);
}, []);

useEffect(() => {
  if (!started) return;

  const timer = setInterval(() => {
    setTime((prev) => {
      if (prev <= 0) {
    clearInterval(timer);
    setIsTimeUp(true);
    return 0;
  }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [started]);


useEffect(() => {
  if (!isTimeUp) return;

  const timer = setTimeout(() => {
    setShowNishida(true);
  }, 3000);

  return () => clearTimeout(timer);
}, [isTimeUp]);

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

        <audio
  ref={bgmRef}
  src="/sounds/Kabukicho.mp3"
  loop
/>

        
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
  onClick={() => {
    setStarted(true);

    if (bgmRef.current) {
      bgmRef.current.play();
    }
  }}
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
            所持金：{money}円
          </p>

          <p
  style={{
    position: "absolute",
    top: "100px",
  }}
>
  残り時間：{time}秒
</p>
{isTimeUp && (
  <div
  style={{
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.4)",
    fontSize: "72px",
    fontWeight: "bold",
    color: "red",
    textShadow: "3px 3px 6px black",
    whiteSpace: "nowrap",
    textAlign: "center",
    zIndex: 9999,
  }}
>
  TIME UP!!
</div>
)}

{showNishida && (
  <>
    <div
  style={{
    position: "fixed",
    left: "180px",
    bottom: "250px",
    background: "black",
    color: "white",
    padding: "12px 18px",
    border: "4px solid white",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "monospace",
    zIndex: 10001,
  }}
>
  目つぶってやっとんけ？笑
</div>

    <img
      src="/images/nishida.png"
      alt="西田"
      style={{
        position: "fixed",
        left: "50px",
        bottom: "100px",
        width: "150px",
        zIndex: 10000,
      }}
    />
  </>
)}

         {fallingItems.map((item) => (   
  <img
    key={item.id}
    src={item.image}
    alt="落下物"
    style={{
      width: "40px",
      position: "fixed",
      top: `${item.y}px`,
      left: `${item.x}px`,
    }}
  />
))}

          {/* 左右キー */}
          <div
            style={{
              position: "fixed",
              bottom: "40px",
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
              bottom: "120px",
              transform: `translateX(${waniX}px)`,
            }}
          />
        </>
      )}
    </main>
  );
}