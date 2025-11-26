import { View } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";

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

      {targets.map((target) => (
        <Target key={target.id} data={target} />
      ))}
    </View>
  );
}
