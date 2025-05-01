import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  View,
  TextInputProps,
} from "react-native";
import React, { FC } from "react";

type inputProps = {
  data: {
    label: string;
    name?: string;
    placeholder: string;
  };
} & TextInputProps;
const TextInput: FC<inputProps> = ({ data, ...props }) => {
  return (
    <View>
      <Text style={styles.labelStyle}>{data?.label}</Text>
      <ReactNativeTextInput
        onChangeText={(e) => {}}
        placeholder={data?.placeholder}
        style={styles.textInput}
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
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 15 },
});
