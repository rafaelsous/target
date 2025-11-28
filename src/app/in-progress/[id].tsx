import { Alert, View } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";
import { Transaction, TransactionProps } from "@/components/Transaction";

const progress = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
};

const transactions: TransactionProps[] = [
  {
    id: Math.random().toString(36).substring(2),
    type: TransactionTypes.OUTPUT,
    value: "R$ 20,00",
    date: "27/11/2024",
  },
  {
    id: Math.random().toString(36).substring(2),
    type: TransactionTypes.INPUT,
    value: "R$ 300,00",
    date: "27/11/2024",
    description: "CDB de 110% no banco XPTO",
  },
];

export default function InProgress() {
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  const targetsDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await targetsDatabase.show(Number(id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        percentage: response.percentage,
        target: numberToCurrency(response.amount),
      });
    } catch (error) {
      Alert.alert("Erro", "Não possível carregar detalhes da meta.");
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
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
        padding: 24,
        gap: 32,
      }}
    >
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate("/target"),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => console.log("Removing transaction...")}
          />
        )}
        showsHorizontalScrollIndicator={false}
        emptyMessage="Nenuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  );
}
