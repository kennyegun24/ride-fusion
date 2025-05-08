import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  View,
  TextInputProps,
  ColorSchemeName,
} from "react-native";
import React, { FC } from "react";
import { ThemedText } from "./ThemedText";

type inputProps = {
  data: {
    label: string;
    name?: string;
    placeholder: string;
  };
  theme?: ColorSchemeName;
} & TextInputProps;
const TextInput: FC<inputProps> = ({ data, theme, ...props }) => {
  return (
    <View>
      <ThemedText lightColor="#4B524E" style={styles.labelStyle}>
        {data?.label}
      </ThemedText>
      <ReactNativeTextInput
        onChangeText={(e) => {}}
        placeholder={data?.placeholder}
        style={[
          styles.textInput,
          { color: theme === "light" ? "#000" : "#fff" },
        ]}
        {...props}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 6,
    backgroundColor: "#171C2208",
  },
  scroll: { paddingVertical: 24 },
  labelStyle: { fontWeight: 600, fontSize: 15 },
});
