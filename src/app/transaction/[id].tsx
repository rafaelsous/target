import { Button, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Transaction ID: {params.id}</Text>
      <Button title="Voltar" onPress={() => router.navigate("/")} />
    </View>
  );
}
