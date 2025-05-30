import { COLORS } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";

const FilterHeader = () => <Text style={styles.header}>Filter Tasks</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: COLORS.black,
  },
});

export default FilterHeader;
