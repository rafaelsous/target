import { router } from "expo-router";
import { Button, Text, View } from "react-native";

import { colors } from "@/theme/colors";

export default function Target() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
        gap: 16,
      }}
    >
      <Text>Target Screen</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
