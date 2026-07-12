"use client";

export default function ExchangePage() {
  const prizes = [
    {
      name: "アクリルスタンド１",
      price: 300,
      image: "/images/chi1.png",
    },
    {
      name: "アクリルスタンド２",
      price: 500,
      image: "/images/chi2.png",
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

      <p
        style={{
          textAlign: "center",
        }}
      >
        交換する景品を選んでください
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
            <h2>{prize.name}</h2>

            <img
              src={prize.image}
              alt={prize.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
            />

            <p>
              必要チップ：{prize.price}枚
            </p>

            <button>
              交換する
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}