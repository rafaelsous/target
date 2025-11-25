import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { colors } from "@/theme/colors";

import { Summary } from "../Summary";
import { Separator } from "../Separator";

export type HomeHeaderProps = {
  total: string;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Readonly<Props>) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          icon={{ name: "arrow-upward", color: colors.green[500] }}
          data={{ label: "Entradas", value: "R$ 11.788,18" }}
        />

        <Summary
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          data={{ label: "Saídas", value: "-R$ 2.377,83" }}
          isLeft
        />
      </View>
    </LinearGradient>
  );
}
