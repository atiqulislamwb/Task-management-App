import { COLORS } from "@/constants/theme";
import { showMessage } from "react-native-flash-message";

export default function AppPopup(
  message: string,
  description: string,
  type?: "success" | "danger",
  duration?: number
) {
  showMessage({
    message: message,
    description: description,
    type: type || "default",
    icon: type,
    backgroundColor:
      type === "success"
        ? COLORS.black
        : type === "danger"
        ? COLORS.error
        : null,
    duration: duration || 1500,
  });
}
