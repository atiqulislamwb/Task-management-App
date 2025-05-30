import SocialLoginButton from "@/components/auth/SocialLoginButton";
import AppScreen from "@/components/common/AppScreen";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const Auth = () => {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>

        <Animated.View
          style={styles.socialButtonsContainer}
          entering={FadeInDown.duration(300)}
        >
          <SocialLoginButton strategy="google" />
          <SocialLoginButton strategy="facebook" />
        </Animated.View>
      </View>
    </AppScreen>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  socialButtonsContainer: {
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
});
