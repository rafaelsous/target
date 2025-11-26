import { View } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";

const summary = {
  total: "R$ 22.549,76",
  input: { label: "Entradas", value: "R$ 11.788,18" },
  output: { label: "Saídas", value: "-R$ 2.377,83" },
};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HomeHeader data={summary} />
    </View>
  );
}
