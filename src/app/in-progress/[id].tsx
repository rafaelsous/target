import { View } from "react-native";

import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";

const data = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
};

export default function InProgress() {
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
          onPress: () => {},
          icon: "edit",
        }}
      />

      <Progress data={data} />
    </View>
  );
}
