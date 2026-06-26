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
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isHomeRun, setIsHomeRun] = useState(false);

  useEffect(() => {
    const bgm = new Audio("/sounds/Neraiuchi.mp3");
    bgm.loop = true;
    bgm.volume = 0.3;

    bgmRef.current = bgm;

    const startBgm = () => {
      bgm.play().catch(() => {});
    };

    document.addEventListener("click", startBgm, { once: true });

    return () => {
      bgm.pause();
    };
  }, []);

  const flipSound = () => {
    const audio = new Audio("/sounds/flip.mp3");
    audio.volume = 0.7;
    audio.play();
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
    const chance = Math.random();

    if (chance < 0.5) {
      bgmRef.current?.pause();

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

    if (!card.revealed) {
      flipSound();

      const updated = [...drawnCards];
      updated[index].revealed = true;
      setDrawnCards(updated);
      return;
    }

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
          onClick={() => setZoomImage(null)}
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
          {zoomImage && zoomImage.endsWith(".mp4") ? (
            <video
              src={zoomImage}
              autoPlay
              muted
              playsInline
              onEnded={() => {
                setZoomImage(null);
                setIsHomeRun(false);
                bgmRef.current?.play().catch(() => {});
              }}
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

      <main style={{ padding: 20, textAlign: "center", background: "#111", minHeight: "100vh", color: "white" }}>
        <h1>SPELL CARD</h1>

        <button onClick={drawCards}>
          なんとかなれーッ！！
        </button>

        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          {drawnCards.map((card, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <img src={card.image} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}