import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ClearFilterButtonProps {
  onPress: () => void;
}

const ClearFilterButton: React.FC<ClearFilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.clearFilterButton} onPress={onPress}>
      <Text style={styles.clearFilterText}>Clear Filters</Text>
      <Feather name="x" size={16} color="#000" />
    </TouchableOpacity>
  );
};

export default ClearFilterButton;
const styles = StyleSheet.create({
  clearFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  clearFilterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});
