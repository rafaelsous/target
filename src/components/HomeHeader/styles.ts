import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 324,
    paddingHorizontal: 24,
    paddingBottom: 18,
    justifyContent: "flex-end",
    gap: 24,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.white,
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: 32,
    color: colors.white,
  },
});
