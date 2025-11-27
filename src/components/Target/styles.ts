import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.black,
  },
  status: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.gray[600],
  },
});
