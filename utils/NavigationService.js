import { createNavigationContainerRef } from "@react-navigation/native";

// RootNavigation.js

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.current && navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
