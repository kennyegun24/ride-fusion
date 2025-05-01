import React, { createContext, PropsWithChildren, useContext } from "react";
import { Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

type toastProps = {
  toastType?: string;
  text1: string;
  text2?: string;
};

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#269355",
        borderLeftColor: "white",
        zIndex: 99999,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: "400",
        color: "#fff",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "red",
        zIndex: 99999,
      }}
      text1Style={{
        fontSize: 17,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "transparent" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export const ToastContext = createContext({
  showToast: (e: toastProps) => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const showToast = ({ toastType, text1, text2 }: toastProps) => {
    Toast.show({
      type: toastType,
      text1: text1,
      text2: text2,
    });
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast visibilityTime={1500} config={toastConfig} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
