import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[500],
  },
  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  current: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.black,
  },
  target: {
    fontSize: 14,
    color: colors.gray[500],
  },
  percentage: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.blue[500],
  },
  progress: {
    width: "100%",
    height: 5,
    marginTop: 16,
    backgroundColor: colors.gray[300],
    borderRadius: 999,
    overflow: "hidden",
  },
  currentProgress: {
    maxWidth: "100%",
    height: 5,
    backgroundColor: colors.blue[500],
  },
});
