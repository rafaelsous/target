import { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";

import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const { id } = useLocalSearchParams<{ id?: string }>();

  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert("Atenção", "Preencha nome e valor maior que zero.");
    }

    setIsProcessing(true);

    if (id) {
      update(Number(id));
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });
      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cria nova meta.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
      console.log(error);
    }
  }

  async function update(id: number) {
    try {
      await targetDatabase.update({
        id,
        name,
        amount,
      });

      Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar a meta.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleRemove() {
    if (!id) {
      return;
    }

    Alert.alert("Remover", "Deseja realmente remover a meta?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          remove(Number(id));
        },
      },
    ]);
  }

  async function remove(id: number) {
    try {
      setIsProcessing(true);
      await targetDatabase.remove(id);
      Alert.alert("Sucesso", "Meta removida com sucesso!", [
        { text: "Ok", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a meta.");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetails(Number(id));
    }
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <StatusBar barStyle="dark-content" />

      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButton={
          id
            ? {
                icon: "delete",
                onPress: handleRemove,
              }
            : undefined
        }
      />

      <View style={{ marginTop: 32, gap: 20 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
