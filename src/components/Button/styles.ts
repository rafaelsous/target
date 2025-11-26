import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: colors.blue[500],
    borderRadius: 999,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.white,
  },
});
