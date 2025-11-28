import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { HomeHeader } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";

import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";

const summary = {
  total: "R$ 22.549,76",
  input: { label: "Entradas", value: "R$ 11.788,18" },
  output: { label: "Saídas", value: "-R$ 2.377,83" },
};

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const database = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await database.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
      return [];
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        title="Metas"
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        data={targets}
        keyExtractor={(item) => String(item.id)}
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
