import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { TransactionTypes } from "@/utils/TransactionTypes";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
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
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log(id);

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 32,
      }}
    >
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate("/target"),
        }}
      />

      <Progress data={progress} />

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
