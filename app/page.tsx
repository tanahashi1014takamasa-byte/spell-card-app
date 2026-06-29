"use client";

import { useState, useEffect, useRef } from "react";

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

type DrawnCard = {
  image: string;
  revealed: boolean;
};

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isHomeRun, setIsHomeRun] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [bgmStarted, setBgmStarted] = useState(false);

  const [ruleText, setRuleText] = useState("");
  const [guideText, setGuideText] = useState("");

  const [activePanel, setActivePanel] =
  useState<"rule" | "guide" | "none">("none");

  

  useEffect(() => {
    const bgm = new Audio("/sounds/Neraiuchi.mp3");
    bgm.loop = true;
    bgm.volume = 0.3;

    bgmRef.current = bgm;

    const startBgm = () => {
  if (bgmStarted) return;

  bgmRef.current?.play().catch(() => {});
  setBgmStarted(true);
};


    return () => {
      bgm.pause();
    };
  }, []);

  useEffect(() => {
  fetch("/chiikawa.txt")
    .then((response) => response.text())
    .then((text) => {
      setRuleText(text);
    })
    .catch((error) => {
      console.error("ルールの読み込みに失敗しました", error);
    });
}, []);

  const flipSound = () => {
    const audio = new Audio("/sounds/flip.mp3");
    audio.volume = 0.7;
    audio.play();
  };

  const closeZoom = () => {
  setZoomImage(null);
  setIsHomeRun(false);
  bgmRef.current?.play().catch(() => {});
};

  const drawCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    setDrawnCards(
      shuffled.slice(0, 2).map((card) => ({
        image: card,
        revealed: false,
      }))
    );

    setSelectedCard(null);
  };

  const handleCardClick = (index: number) => {
  if (isHomeRun) return;

  const card = drawnCards[index];

  // ① 裏カード → めくるだけ
  if (!card.revealed) {
    flipSound();

    const updated = [...drawnCards];
    updated[index].revealed = true;
    setDrawnCards(updated);
    return;
  }

  // ② 表カード → 効果表示（ここが本体）
  const chance = Math.random();

  if (chance < 0.04) {
    const videos = [
      "/videos/home-run-1.mp4",
      "/videos/home-run-2.mp4",
    ];

    const randomVideo =
      videos[Math.floor(Math.random() * videos.length)];

    setIsHomeRun(true);
    setZoomImage(randomVideo);
    return;
  }

  // ③ 通常拡大（効果を見る）
  setIsZooming(true);

  setTimeout(() => {
    setZoomImage(card.image);
    setIsZooming(false);
  }, 150);
};

return (
  <>
    {zoomImage && (
      
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}




    onClick={closeZoom}
  >
    {zoomImage.endsWith(".mp4") ? (
  <video
  src={zoomImage}
  autoPlay
  playsInline
  onEnded={closeZoom}
  onClick={(e) => e.stopPropagation()}
  style={{
    width: "85vw",
    maxWidth: "500px",
    borderRadius: "12px",
  }}
/>
) : (
  <img
    src={zoomImage}
    style={{
      width: "85vw",
      maxWidth: "500px",
      borderRadius: "12px",
      animation: "zoomIn 0.2s ease-out",
    }}
  />
)}
  </div>
)}

{isOpen && (
  <div
    onClick={() => setIsOpen(false)}
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
    <div onClick={(e) => e.stopPropagation()}>
      {guideText}
    </div>
  </div>
)}


    {/* ★ここに追加 */}
    {isZooming && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.95)",
          zIndex: 9998,
        }}
      />
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
      
        <h1
  style={{
    fontFamily: "var(--font-cinzel)",
    fontSize: "38px",
    letterSpacing: "3px",
    color: "#f5f5f5",
    marginBottom: "20px",
    textShadow: "0 0 10px rgba(255,255,255,0.15)",
  }}
>
  SPELL CARD
</h1>

        <button
  onClick={() => {
    bgmRef.current?.play().catch(() => {});
    drawCards();
  }}
  style={{
    padding: "16px 32px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg, #333, #111)",
    border: "2px solid #666",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "20px",
  }}
>
  なんとかなれーッ！！
</button>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {drawnCards.map((card, index) => (
            <div
              key={index}
              className="card-container"
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
                <img
                  src="/cards/back.png"
                  className="card-back"
                />

                <img
                  src={card.image}
                  className="card-front"
                />
              </div>
            </div>
          ))}
        </div>

        

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/yah.png"
            alt="yah"
            style={{
              width: "420px",
              height: "auto",
            }}
          />
        </div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <img
    src="/images/spellcard-guide.png"
    alt="spellcard-guide"
    onClick={() => {
      fetch("/text/スペルカード名鑑.txt")
        .then((response) => response.text())
        .then((text) => {
          setGuideText(text);
          setActivePanel("guide");
        });
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />

 {activePanel === "guide" && (
  <div
    onClick={() => setActivePanel("none")}
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
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "80vw",
        maxHeight: "80vh",
        overflowY: "auto",
        border: "1px solid #444",
      }}
    >
      <pre
        style={{
          color: "white",
          fontSize: "14px",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap",
          margin: 0,
        }}
      >
        {guideText}
      </pre>
    </div>
  </div>
)}

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
  }}
>
 <img
  src="/images/rule_book.png"
  alt="rule_book"
  onClick={() => setActivePanel("rule")}
  style={{
    width: "500px",
    height: "auto",
    cursor: "pointer",
  }}
/>
</div>

      </main>
    </>
);
      
}