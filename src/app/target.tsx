import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Target() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Target Screen</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
