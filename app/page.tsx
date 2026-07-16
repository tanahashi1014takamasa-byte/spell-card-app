"use client";

import { useState, useEffect, useRef } from "react";

const cards = [
  {
    name: "カース",
    image: "/cards/カース.png",
    physicalPenalty: true,
  },
  {
    name: "グングニル",
    image: "/cards/グングニル.png",
    physicalPenalty: false,
  },
  {
    name: "サムフリック",
    image: "/cards/サムフリック.png",
    physicalPenalty: true,
  },
  {
    name: "ショットガン",
    image: "/cards/ショットガン.png",
    physicalPenalty: false,
  },
  {
    name: "スチール",
    image: "/cards/スチール.png",
    physicalPenalty: false,
  },
  {
    name: "トマソン",
    image: "/cards/トマソン.png",
    physicalPenalty: false,
  },
  {
    name: "ナパームガール",
    image: "/cards/ナパームガール.png",
    physicalPenalty: false,
  },
  {
    name: "ノーリスト",
    image: "/cards/ノーリスト.png",
    physicalPenalty: true,
  },
  {
    name: "パーム・ストライク",
    image: "/cards/パーム・ストライク.png",
    physicalPenalty: true,
  },
  {
    name: "ファントム",
    image: "/cards/ファントム.png",
    physicalPenalty: false,
  },
  {
    name: "ブラインド",
    image: "/cards/ブラインド.png",
    physicalPenalty: true,
  },
  {
    name: "ブラックチケット",
    image: "/cards/ブラックチケット.png",
    physicalPenalty: false,
  },
  {
    name: "ボルテックス",
    image: "/cards/ボルテックス.png",
    physicalPenalty: true,
  },
  {
    name: "マグネットフォース",
    image: "/cards/マグネットフォース.png",
    physicalPenalty: false,
  },
  {
    name: "四次元マンション",
    image: "/cards/四次元マンション.png",
    physicalPenalty: false,
  },
];

type DrawnCard = {
  image: string;
  revealed: boolean;
  rare?: boolean;
  physicalPenalty?: boolean;
  homeRunChecked?: boolean;
};

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<
  {
    image: string;
    revealed: boolean;
    rare?: boolean;
    physicalPenalty?: boolean;
    homeRunChecked?: boolean;
  }[]
>([]);
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [zoomCard, setZoomCard] = useState<{
  image: string;
  revealed: boolean;
  rare?: boolean;
  physicalPenalty?: boolean;
} | null>(null);
  const [showPhysicalText, setShowPhysicalText] = useState(false);

  const [isHomeRun, setIsHomeRun] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [bgmStarted, setBgmStarted] = useState(false);
  const [isRuleOpen, setIsRuleOpen] = useState(false);
  const [ruleText, setRuleText] = useState("");
  const [isExpansionOpen, setIsExpansionOpen] = useState(false);
  const [expansionText, setExpansionText] = useState("");
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
  const [physicalText, setPhysicalText] = useState("");
  const [isExpansionAnimation, setIsExpansionAnimation] = useState(false);
  const [showExpansionImage, setShowExpansionImage] = useState(false);
  
  


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


useEffect(() => {
  fetch("/text/制約と誓約.txt")
    .then((res) => res.text())
    .then((text) => setPhysicalText(text));
}, []);

  const drawCards = () => {
    const shuffled = [...cards]
  .filter((card) => card.name !== "四次元マンション")
  .sort(() => Math.random() - 0.5);

    const isRare = Math.random() < 0.03;

    const rareCard = cards.find((card) => card.name === "四次元マンション");

    setDrawnCards(
  (isRare && rareCard ? [rareCard, ...shuffled].slice(0, 2) : shuffled.slice(0, 2)).map((card) => ({
    image: card.image,
    revealed: false,
    rare: card.name === "四次元マンション",
    physicalPenalty: card.physicalPenalty,
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
if (!card.homeRunChecked) {

  const updated = [...drawnCards];
  updated[index].homeRunChecked = true;
  setDrawnCards(updated);

  const chance = Math.random();

  if (chance < 0.03) {
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
  }

  // ③ 通常拡大（効果を見る）
  setIsZooming(true);
  setTimeout(() => {
  setZoomImage(card.image);
  setZoomCard(card);
  console.log(card);
  setIsZooming(false);
}, 150);

};

return (


   <>

<button
      onClick={() => window.location.reload()}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "36px",
        cursor: "pointer",
        zIndex: 10003,
      }}
    >
      ↻
    </button>

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
    animation: "none",
    filter:
      zoomImage === "/cards/四次元マンション.png"
        ? "brightness(2) drop-shadow(0 0 30px white)"
        : "none",
  }}
/>
)}

{zoomCard?.physicalPenalty && (
  <img
    src="/images/制約と誓約.png"
    alt="制約と誓約"
  onClick={(e) => {
  e.stopPropagation();
  setShowPhysicalText(true);
}}
    style={{
  position: "fixed",
  top: "50px",
  right: "50px",
  width: "100px",
  zIndex: 10000,
}}
  />
)}

{showPhysicalText && (
  <div
  onClick={(e) => {
    e.stopPropagation();
    setShowPhysicalText(false);
  }}
  style={{
  position: "fixed",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#333",
  color: "white",
  padding: "30px",
  borderRadius: "10px",
  zIndex: "20000",
  whiteSpace: "pre-line",
  width: "90%",
  maxWidth: "90%",
  maxHeight: "70vh",
  overflowY: "auto",
}}
    >
    <h2
      style={{
        textAlign: "center",
        fontSize: "28px",
        marginBottom: "20px",
      }}
    >
      【制約と誓約】
    </h2>

    <div
      style={{
        textAlign: "left",
      }}
    >
      {physicalText}
    </div>
  </div>
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
  src="/images/なんとかなれ３.png"
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
  style={{
    animation:
      card.image === "/cards/四次元マンション.png"
        ? "rareFlash 0.8s infinite"
        : "none",
  }}
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


<img
  src="/images/拡腸展開.png"
  alt="拡腸展開"
  onClick={() => {
    if (!isExpansionOpen) {
      fetch("/text/拡腸展開.txt")
        .then((response) => response.text())
        .then((text) => {
          setExpansionText(text);
          setIsExpansionOpen(true);
        });
    } else {
      setIsExpansionOpen(false);
    }
  }}
  style={{
    marginTop: "40px",
    cursor: "pointer",
  }}
/>

{isExpansionOpen && (
  <div
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
    <p>
      {expansionText}
    </p>

    <button
     onClick={() => {
  setIsExpansionAnimation(true);

}}
     style={{
  marginTop: "20px",
  padding: "12px 40px",
  fontSize: "20px",
  fontWeight: "bold",
  background: "#ff69b4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
}}
    >
      発動
    </button>
  </div>
)}

{isExpansionAnimation && (
  <div
  onClick={() => {
      setIsExpansionAnimation(false);
      setShowExpansionImage(false);
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "black",
      zIndex: 30000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {!showExpansionImage && (
    <video
  src="/videos/effect.mp4"
  autoPlay
  playsInline
  onEnded={() => {
  setShowExpansionImage(true);
  new Audio("/sounds/拡腸展開.mp3").play();
}}
  style={{
    width: "80vw",
    maxWidth: "700px",
  }}
/>
)}

{showExpansionImage && (
  <>
    <div className="expansion-aura" />

  <img
    src="/images/拡腸展開s.png"
    alt="拡腸展開"
    style={{
      width: "80vw",
      maxWidth: "700px",
      height: "auto",
    }}
  />
  </>
)}

  </div>
)}




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
        style={{ marginTop: "10px" }}
          onClick={() => {
            window.location.href =
              "https://spell-card-app.vercel.app/exchange";
          }}
        >
          💴 景品交換
        </button>

        <button
        style={{ marginTop: "10px" }}
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
{selectedCard && (
  <div
    onClick={() => setSelectedCard(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
     <div
      style={{
        position: "relative",
      }}
    >
      <img
        src={selectedCard.image}
        style={{
          width: "300px",
          filter: "brightness(2)",
        }}
      />

      {selectedCard.physicalPenalty && (
        <img
          src="/images/制約と誓約.png"
          alt="制約と誓約"
          style={{
            position: "absolute",
            top: "10px",
            right: "-80px",
            width: "100px",
          }}
        />
      )}
    </div>
  </div>
)}
      </main>
    </>
);
      
}