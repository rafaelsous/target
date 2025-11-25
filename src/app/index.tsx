import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text>Olá, Expo Router!</Text>

      <Button title="Nova meta" onPress={() => router.navigate("/target")} />

      <Button
        title="Transação"
        onPress={() => router.navigate("/transaction/1207")}
      />

      <Button
        title="Progresso"
        onPress={() => router.navigate("/transaction/1207")}
      />
    </View>
  );
}
