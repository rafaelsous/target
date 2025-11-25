import { ColorValue, View } from "react-native";

import { styles } from "./styles";

export function Separator({ color }: Readonly<{ color: ColorValue }>) {
  return <View style={[styles.separator, { backgroundColor: color }]} />;
}
