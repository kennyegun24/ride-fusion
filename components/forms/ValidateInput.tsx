import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  View,
  TextInputProps,
  useColorScheme,
} from "react-native";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { ThemedText } from "../ThemedText";
import { ColorSchemeName } from "react-native";

type inputProps = {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  theme: ColorSchemeName;
} & TextInputProps;
const ValidateInput = ({
  label,
  name,
  placeholder,
  control,
  theme,
  ...props
}: inputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => {
        const errorStyle = {
          color: error ? "red" : "#4B524E",
        };
        const errorField = {
          borderColor: error ? "red" : "#E9E9E9",
        };
        return (
          <>
            <ThemedText
              lightColor={error ? "red" : "#4B524E"}
              darkColor={error ? "red" : "#fff"}
            >
              {label}
            </ThemedText>
            <ReactNativeTextInput
              placeholderTextColor={"#8B8B8B"}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
              style={[
                styles.textInput,
                {
                  ...errorField,
                  color: theme === "light" ? "#000" : "#b6b6b6",
                },
              ]}
            />
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
          </>
        );
      }}
    ></Controller>
  );
};

export default ValidateInput;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: "#171C2208",
  },
  scroll: { paddingVertical: 24 },
  labelStyle: { fontWeight: 600, fontSize: 16 },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
  },
});
