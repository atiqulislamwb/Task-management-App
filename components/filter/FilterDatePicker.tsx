import { COLORS } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface FilterDatePickerProps {
  label: string;
  date: Date | null;
  setDate: (date: Date) => void;
}

const FilterDatePicker: React.FC<FilterDatePickerProps> = ({
  label,
  date,
  setDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() : `Select ${label.toLowerCase()}`}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
        accentColor={COLORS.black}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.deepGray,
    letterSpacing: 0.5,
  },
  datePicker: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  dateText: {
    fontSize: 15,
    color: COLORS.black,
  },
});

export default FilterDatePicker;
