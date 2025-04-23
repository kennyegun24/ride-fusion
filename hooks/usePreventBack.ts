import { useEffect } from "react";
import { useNavigation, usePreventRemove } from "@react-navigation/native";

export const usePreventBack = (
  message = "Are you sure you want to go back?"
) => {
  const navigation = useNavigation();

  // usePreventRemove(true, ({ data }) => {
  //   // Optional confirmation logic
  //   const allow = window.confirm?.(message); // works on web
  //   if (allow) {
  //     data.action?.(); // allow navigation
  //   }
  //   // Otherwise, do nothing — prevents back
  // });

  usePreventRemove(true, (e) => {
    return false;
  });

  useEffect(() => {
    navigation.setOptions?.({
      headerBackVisible: false,
      headerBackButtonMenuEnabled: false,
      gestureEnabled: false, // Disable swipe back gesture
    });
  }, [navigation]);
};
