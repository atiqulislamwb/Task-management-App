import { COLORS } from "@/constants/theme";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const MainScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user logged in info", user);

  if (!!user?.sessionId) {
    return <Redirect href={"/home"} />;
  }

  if (!user?.sessionId) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={COLORS.black} />
    </View>
  );
};

export default MainScreen;
