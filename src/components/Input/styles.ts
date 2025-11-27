import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[500],
  },
  input: {
    paddingBottom: 12,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});
