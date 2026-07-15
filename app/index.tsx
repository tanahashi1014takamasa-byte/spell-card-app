import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

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

export default function Index() {
  const [drawn, setDrawn] = useState<string[]>([]);

  const draw = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDrawn(shuffled.slice(0, 2));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>スペルカードアプリ</Text>

      <Pressable onPress={draw}>
        <Text>カードを2枚引く</Text>
      </Pressable>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {drawn.map((c, i) => (
          <Image
            key={i}
            source={{ uri: c }}
            style={{ width: 150, height: 220 }}
          />
        ))}
      </View>
    </View>
  );
}