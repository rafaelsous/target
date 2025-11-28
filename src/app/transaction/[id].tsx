import { useState } from "react";
import { Alert, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { TransactionType } from "@/components/TransactionType";

import { TransactionTypes } from "@/utils/TransactionTypes";

import { useTransactionDatabase } from "@/database/useTransactionDatabase";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.INPUT);
  const [isCreating, setIsCreating] = useState(false);
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");

  const { id } = useLocalSearchParams<{ id: string }>();
  const transactionDatabase = useTransactionDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert(
          "Nova Transação",
          "Informe um valor maior que zero.",
          [{ text: "Ok" }]
        );
      }

      setIsCreating(true);

      await transactionDatabase.create({
        target_id: Number(id),
        amount: type === TransactionTypes.OUTPUT ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Sucesso", "Nova transação cadastrada com sucesso!", [
        { text: "Ok", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 16,
      }}
    >
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />

      <View style={{ marginTop: 32, gap: 20 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
