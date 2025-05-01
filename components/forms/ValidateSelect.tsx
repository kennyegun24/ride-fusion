import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  View,
  TextInputProps,
} from "react-native";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

type inputProps = {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  data: any[];
} & TextInputProps;

type dropdownValue = {
  value: string;
};
const ValidateSelect = ({
  label,
  name,
  placeholder,
  control,
  data,
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
            <Dropdown
              style={[
                styles.dropdown,
                {
                  ...errorField,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              searchPlaceholder="Search..."
              value={value}
              // onFocus={() => setIsFocus(true)}
              onBlur={onBlur}
              onChange={(item) => {
                onChange(item.value);
                // setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={"black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
          </>
        );
      }}
    ></Controller>
  );
};

export default ValidateSelect;

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
  dropdown: {
    height: 50,
    borderColor: "#E9E9E9",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 6,
    backgroundColor: "#171C2208",
  },
  icon: {
    opacity: 0.4,
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#4B524E",
    opacity: 0.4,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    opacity: 0.4,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
