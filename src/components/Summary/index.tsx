import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, Text, View } from "react-native";

import { styles } from "./styles";

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  data: SummaryProps;
  isRight?: boolean;
};

export function Summary({ icon, data, isRight = false }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isRight && styles.labelRight]}>
        <MaterialIcons name={icon.name} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
