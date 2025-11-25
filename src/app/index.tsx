import { router } from "expo-router";
import { Button, Text, View } from "react-native";

import { colors } from "@/theme/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
      }}
    >
      <Text>Olá, Expo Router!</Text>

      <Button title="Nova meta" onPress={() => router.navigate("/target")} />
    </View>
  );
}
