import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const AppScreen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;

const styles = StyleSheet.create({});
