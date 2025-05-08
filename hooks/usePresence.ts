import { setStatus } from "@/helper/setStatus";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export function usePresence(userId: string | null) {
  const appState = useRef(AppState.currentState);
  const pingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPinging = () => {
    if (pingInterval.current) return;
    pingInterval.current = setInterval(() => {
      if (userId) {
        setStatus(userId, "online"); // update last_changed every 30s
        console.log("change");
      }
    }, 1000 * 60 * 1.5); // 30 seconds
  };

  const stopPinging = () => {
    if (pingInterval.current) {
      clearInterval(pingInterval.current);
      pingInterval.current = null;
    }
  };
  useEffect(() => {
    if (!userId) return;
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App has come to foreground
        console.log("foreground");
        setStatus(userId, "online");
        startPinging();
      } else if (nextAppState.match(/inactive|background/)) {
        // App is going to background
        console.log("background");
        setStatus(userId, "offline");
        stopPinging();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // On mount, mark online & start pinging
    setStatus(userId, "online");
    startPinging();

    return () => {
      subscription.remove();
      stopPinging();
      setStatus(userId, "offline");
    };
  }, []);
}
