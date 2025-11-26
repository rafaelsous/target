import { View } from "react-native";
import { router } from "expo-router";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Target } from "@/components/Target";
import { HomeHeader } from "@/components/HomeHeader";

const summary = {
  total: "R$ 22.549,76",
  input: { label: "Entradas", value: "R$ 11.788,18" },
  output: { label: "Saídas", value: "-R$ 2.377,83" },
};

const targets = [
  {
    id: Math.random().toString(36).substring(2),
    name: "Apple Watch",
    percentage: "50%",
    current: "R$ 895,00",
    target: "R$ 1.790,00",
  },
  {
    id: Math.random().toString(36).substring(2),
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: Math.random().toString(36).substring(2),
    name: "Fazer uma viagem para o Rio de Janeiro",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 2.250,00",
  },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HomeHeader data={summary} />

      <List
        title="Metas"
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
