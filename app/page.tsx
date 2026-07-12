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
  const [isRuleOpen, setIsRuleOpen] = useState(false);
  const [ruleText, setRuleText] = useState("");
  const [guideText, setGuideText] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isBambiOpen, setIsBambiOpen] = useState(false);
  const [resumeBgm, setResumeBgm] = useState(true);
  const [showTaniguchi, setShowTaniguchi] = useState(false);
  const [taniguchiText, setTaniguchiText] = useState("");
  const [maruiText, setMaruiText] = useState("");
  const [igarashiText, setIgarashiText] = useState("");
　const [kondoText, setKondoText] = useState("");
  const [waniImage, setWaniImage] = useState("/images/wani③.png");
  const [isWaniOpen, setIsWaniOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [codeText, setCodeText] = useState("");
  const [activePanel, setActivePanel] = useState<
  "menu" | "source" | "development" | "production" | "baseballnote" | null
>(null);
  const [developmentText, setDevelopmentText] = useState("");
  const [productionText, setProductionText] = useState("");
  const [baseballNoteText, setBaseballNoteText] = useState("");
  const [showCanMenu, setShowCanMenu] = useState(false);
  


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


  const flipSound = () => {
    const audio = new Audio("/sounds/flip.mp3");
    audio.volume = 0.7;
    audio.play();
  };

 const closeZoom = () => {
  setZoomImage(null);
  setIsHomeRun(false);

  if (resumeBgm) {
    bgmRef.current?.play().catch(() => {});
  }

  setResumeBgm(true);
};

useEffect(() => {
  fetch("/text/taniguchi.txt")
    .then(res => res.text())
    .then(setTaniguchiText);
}, []);

useEffect(() => {
  fetch("/text/marui.txt")
    .then((res) => res.text())
    .then(setMaruiText);
}, []);

useEffect(() => {
  fetch("/text/igarashi.txt")
    .then((res) => res.text())
    .then(setIgarashiText);
}, []);

useEffect(() => {
  fetch("/text/kondo.txt")
    .then((res) => res.text())
    .then(setKondoText);
}, []);

useEffect(() => {
  fetch("/text/code.txt")
    .then((res) => res.text())
    .then(setCodeText);
}, []);


useEffect(() => {
  fetch("/text/development.txt")
    .then((res) => res.text())
    .then(setDevelopmentText);
}, []);


useEffect(() => {
  fetch("/text/production.txt")
    .then((res) => res.text())
    .then(setProductionText);
}, []);


useEffect(() => {
  fetch("/text/baseballnote.txt")
    .then((res) => res.text())
    .then(setBaseballNoteText);
}, []);

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
    <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "36px",
    cursor: "pointer",
    zIndex: 10003,
  }}
>
  ☰
</button>

    {isMenuOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "250px",
      height: "fit-content",
      background: "#222",
      color: "white",
      padding: "20px",
      zIndex: 10002,
      boxShadow: "-2px 0 10px rgba(0,0,0,0.5)",
    }}
  >
    
<button
  onClick={() => {
    setActivePanel("production");
    setIsMenuOpen(false);
  }}
>
  📂 制作目的
</button>
<br /><br />

<button
  onClick={() => {
    setActivePanel("development");
    setIsMenuOpen(false);
  }}
>
  📂 開発環境
</button>
<br /><br />

<button
  onClick={() => {
    setActivePanel("source");
    setIsMenuOpen(false);
  }}
>
  📂 ソースコード
</button>
  
<br /><br />

<button
  onClick={() => {
    setActivePanel("baseballnote");
    setIsMenuOpen(false);
  }}
>
  📂 Baseball Note
</button>
  </div>
)}

{activePanel === "production" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 10001,
      padding: "20px",
      overflowY: "auto",
    }}
  >
    {/* ×ボタン */}
    <button
      onClick={() => {
        setActivePanel(null);
        setIsMenuOpen(false);
      }}
      style={{
        position: "sticky",
        top: "0",
        display: "block",
        margin: "0 auto 10px auto",
        fontSize: "28px",
        color: "white",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      ✕
    </button>
    
    {/* 制作目的表示 */}
    <pre
      onClick={(e) => e.stopPropagation()}
      style={{
        color: "white",
        whiteSpace: "pre-wrap",
        marginTop: "40px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      {productionText}
    </pre>
  </div>
)}

{activePanel === "source" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 10001,
      padding: "20px",
      overflowY: "auto",
    }}
  >
    {/* ×ボタン */}
    <button
  onClick={() => {
    setActivePanel(null);
    setIsMenuOpen(false);
  }}
  style={{
    position: "sticky",
    top: "0",
    display: "block",
    margin: "0 auto 10px auto",
    fontSize: "28px",
    color: "white",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  }}
>
  ✕
</button>

    {/* コード表示 */}
    <pre
      onClick={(e) => e.stopPropagation()}
      style={{
        color: "white",
        whiteSpace: "pre-wrap",
        marginTop: "40px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      {codeText}
    </pre>
  </div>
)}

{activePanel === "development" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 10001,
      padding: "20px",
      overflowY: "auto",
    }}
  >
    {/* ×ボタン */}
    <button
      onClick={() => {
        setActivePanel(null);
        setIsMenuOpen(false);
      }}
      style={{
        position: "sticky",
        top: "0",
        display: "block",
        margin: "0 auto 10px auto",
        fontSize: "28px",
        color: "white",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      ✕
    </button>

    {/* 開発環境表示 */}
    <pre
      onClick={(e) => e.stopPropagation()}
      style={{
        color: "white",
        whiteSpace: "pre-wrap",
        marginTop: "40px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      {developmentText}
    </pre>
  </div>
)}

{activePanel === "baseballnote" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 10001,
      padding: "20px",
      overflowY: "auto",
    }}
  >
    <button
      onClick={() => {
        setActivePanel(null);
        setIsMenuOpen(false);
      }}
      style={{
        position: "sticky",
        top: "0",
        display: "block",
        margin: "0 auto 10px auto",
        fontSize: "28px",
        color: "white",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      ✕
    </button>

    <pre
      onClick={(e) => e.stopPropagation()}
      style={{
        color: "white",
        whiteSpace: "pre-wrap",
        marginTop: "40px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      {baseballNoteText}
    </pre>
  </div>
)}
  
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
      
        <img
   src="/images/spell-card-logo③.png"
  alt="SPELL CARD"
  style={{
    width: "700px", // 好きなサイズ
    height: "auto",
    marginBottom: "20px",
  }}
/>

       <img
  src="/images/なんとかなれ2.png"
  alt="なんとかなれー!!"
  onClick={() => {
    bgmRef.current?.play().catch(() => {});
    drawCards();
  }}
  style={{
    width: "500px",
    height: "auto",
    cursor: "pointer",
    marginTop: "20px",
  }}
/>

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
            src="/images/cso.png"
            alt="cso"
            style={{
              width: "420px",
              height: "auto",
            }}
          />
        </div>

{/* ====================== ① スペルカード名鑑 ====================== */}
<div
  style={{
    marginTop: "60px",
    justifyContent: "center",
  }}
>
  <img
    src="/images/spellcard-guide.png"
    alt="spellcard-guide"
    onClick={() => {
      if (!isGuideOpen) {
        fetch("/text/スペルカード名鑑.txt")
          .then((response) => response.text())
          .then((text) => {
            setGuideText(text);
            setIsGuideOpen(true);
          });
      } else {
        setIsGuideOpen(false);
      }
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />

  {/* ①のテキスト（名鑑用） */}
  {isGuideOpen && (
    <p
      style={{
        marginTop: "20px",
        color: "white",
        fontSize: "18px",
        lineHeight: "1.8",
        whiteSpace: "pre-wrap",
        textAlign: "left",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {guideText}
    </p>
  )}
</div>

{/* ====================== ② ルールブック ====================== */}
<div
  style={{
    marginTop: "60px",
    justifyContent: "center",
  }}
>
  <img
    src="/images/rule_book.png"
    alt="rule_book"
    onClick={() => {
      if (!isRuleOpen) {
        fetch("/text/chiikawa.txt")
          .then((response) => response.text())
          .then((text) => {
            setRuleText(text);
            setIsRuleOpen(true);
          });
      } else {
        setIsRuleOpen(false);
      }
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />

  {/* ②のテキスト（ルールブック用） */}
  {isRuleOpen && (
    <p
      style={{
        marginTop: "20px",
        color: "white",
        fontSize: "18px",
        lineHeight: "1.8",
        whiteSpace: "pre-wrap",
        textAlign: "left",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {ruleText}
    </p>
  )}
</div>






<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/kisarazu1.png"
    alt="木更津キャッツアイ"
    onClick={() => {
  setResumeBgm(false);
  setZoomImage("/videos/bambi.mp4");
}}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>


<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/木更津バーナー①.png"
    alt="木更津バーナー①"
    onClick={() => {
      setResumeBgm(false);
      setZoomImage("/videos/円陣①.mp4");
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/木更津バーナー②.png"
    alt="木更津バーナー②"
    onClick={() => {
      setResumeBgm(false);
      setZoomImage("/videos/円陣②.mp4");
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/木更津バーナー③.png"
    alt="木更津バーナー③"
    onClick={() => {
      setResumeBgm(false);
      setZoomImage("/videos/ダブル太陽.mp4");
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/木更津バーナー⑤.png"
    alt="木更津バーナー⑤"
    onClick={() => {
      setResumeBgm(false);
      setZoomImage("/videos/木更津キャッツアイのテーマソング.mp4");
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
    src="/images/木更津バーナー④.png"
    alt="木更津バーナー④"
    onClick={() => {
      setResumeBgm(false);
      setZoomImage("/videos/エンディング.mp4");
    }}
    style={{
      width: "500px",
      height: "auto",
      cursor: "pointer",
    }}
  />
</div>

<div
  style={{
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  }}
>
  <img
  src="/images/キャプテンロゴ.png"
  alt="キャプテンロゴ"
  onClick={() => setShowTaniguchi(!showTaniguchi)}
  style={{
    width: "500px",
    height: "auto",
    cursor: "pointer",
  }}
/>
</div>

{showTaniguchi && (
  <>
    {/* 谷口 */}
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "40px",
      }}
    >
      <img
        src="/images/taniguchi.png"
        alt="谷口"
        style={{
          width: "150px",
          height: "150px",
        }}
      />

      <div
        style={{
          flex: 1,
          marginLeft: "20px",
          wordBreak: "break-word",
        }}
      >
        {taniguchiText}
      </div>
    </div>

    {/* 丸井 */}
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "40px",
      }}
    >

<div
  style={{
    flex: 1,
    marginRight: "20px",
    wordBreak: "break-word",
  }}
>
  {maruiText}
</div>

      <img
        src="/images/marui.png"
        alt="丸井"
        style={{
          width: "150px",
          height: "150px",
        }}
      />
    </div>

    {/* イガラシ */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "40px",
  }}
>
  <img
    src="/images/igarashi.png"
    alt="イガラシ"
    style={{
      width: "150px",
      height: "150px",
    }}
  />

  <div
    style={{
      flex: 1,
      marginLeft: "20px",
      wordBreak: "break-word",
    }}
  >
    {igarashiText}
  </div>

  </div>   

 {/* 近藤 */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "40px",
  }}
>
  <div
    style={{
      flex: 1,
      marginRight: "20px",
      wordBreak: "break-word",
    }}
  >
    {kondoText}
  </div>

  <img
    src="/images/kondo.png"
    alt="近藤"
    style={{
      width: "150px",
      height: "150px",
    }}
  />
</div>
  </>
)}


<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  }}
>
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "500px",
    }}
  >
    <img
      src={isWaniOpen ? "/images/wani②.png" : "/images/wani③.png"}
      alt="ワニ"
      onClick={() => setIsWaniOpen(!isWaniOpen)}
      style={{
        width: "100%",
        height: "auto",
        cursor: "pointer",
        display: "block",
      }}
    />

    {isWaniOpen && (
  <>
    <button
      onClick={() => {
  const sound = new Audio("/sounds/説明ウインドウが開く.mp3");
  sound.play();

  setTimeout(() => {
    setShowCanMenu(true);
  }, 300);
}}

      style={{
        position: "absolute",
        left: "18%",
        bottom: "3%",
        width: "14%",
        height: "10%",
        opacity: 0,
        border: "none",
        cursor: "pointer",
      }}
    />

    {showCanMenu && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "black",
          border: "3px solid white",
          padding: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={() => {
            window.location.href =
              "https://spell-card-app.vercel.app/mini-game";
          }}
        >
          🎮 ミニゲーム
        </button>

        <button
          onClick={() => {
            window.location.href =
              "https://spell-card-app.vercel.app/exchange";
          }}
        >
          💴 景品交換
        </button>

        <button
          onClick={() => {
            setShowCanMenu(false);
          }}
        >
          ❌ とじる
        </button>
      </div>
    )}
  </>
)}
  </div>
</div>

      </main>
    </>
);
      
}