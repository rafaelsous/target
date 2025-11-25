import { ColorValue, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
  isLeft?: boolean;
};

export function Summary({ icon, data, isLeft = false }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && styles.labelLeft]}>
        <MaterialIcons name={icon.name} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
