import { Alert, View } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";
import { Transaction, TransactionProps } from "@/components/Transaction";

export default function InProgress() {
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  const targetsDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionDatabase();

  async function fetchTargetDetails() {
    try {
      setIsFetching(true);
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

  async function fetchTransactions() {
    try {
      setIsFetching(true);

      const response = await transactionsDatabase.listByTargetId(Number(id));

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          type:
            item.amount > 0 ? TransactionTypes.INPUT : TransactionTypes.OUTPUT,
          value: numberToCurrency(item.amount),
          date: String(item.created_at),
          description: item.observation,
        }))
      );
    } catch (error) {
      Alert.alert("Erro", "Não possível carregar as transações da meta.");
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
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
          onPress: () => router.navigate(`/target?id=${id}`),
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
