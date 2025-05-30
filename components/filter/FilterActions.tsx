import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterActionsProps {
  onClear: () => void;
  onApply: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({ onClear, onApply }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onClear}
      style={[styles.button, styles.secondaryButton]}
    >
      <Text style={styles.buttonTextSecondary}>Clear All</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onApply}
      style={[styles.button, styles.primaryButton]}
      testID="apply"
    >
      <Text style={styles.buttonTextPrimary}>Apply Filters</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: COLORS.black,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  buttonTextPrimary: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSecondary: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilterActions;
