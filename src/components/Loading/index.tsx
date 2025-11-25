import { ActivityIndicator } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme/colors";

export function Loading() {
  return (
    <ActivityIndicator
      style={styles.container}
      size="large"
      color={colors.blue[500]}
    />
  );
}
