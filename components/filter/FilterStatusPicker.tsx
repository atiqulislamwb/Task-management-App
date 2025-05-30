import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterStatusPickerProps {
  status: string;
  setStatus: (status: string) => void;
}

const FilterStatusPicker: React.FC<FilterStatusPickerProps> = ({
  status,
  setStatus,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>Status</Text>
    <View style={styles.statusRow}>
      {["all", "completed", "incomplete"].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.statusOption,
            status === option && styles.statusOptionSelected,
          ]}
          onPress={() => setStatus(option)}
        >
          <Text
            style={[
              styles.statusText,
              status === option && styles.statusTextSelected,
            ]}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.deepGray,
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statusOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    minWidth: "30%",
    alignItems: "center",
  },
  statusOptionSelected: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.deepGray,
    fontWeight: "500",
  },
  statusTextSelected: {
    color: COLORS.white,
    fontWeight: "600",
  },
});

export default FilterStatusPicker;
