import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  View,
  TextInputProps,
} from "react-native";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

type inputProps = {
  control: any;
  label: string;
  name: string;
  placeholder: string;
} & TextInputProps;
const ValidateInput = ({
  label,
  name,
  placeholder,
  control,
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
        console.log(error);
        return (
          <>
            <Text
              style={[styles.labelStyle, { color: error ? "red" : "#4B524E" }]}
            >
              {label}
            </Text>
            <ReactNativeTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
              style={[styles.textInput, { ...errorField }]}
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
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 16 },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
  },
});
