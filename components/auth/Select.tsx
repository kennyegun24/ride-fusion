import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

interface SelectProps {
  placeholder: string;
  data: any[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Select: FC<SelectProps> = ({ placeholder, data, value, setValue }) => {
  return (
    <Dropdown
      style={[styles.dropdown]}
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
      // onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
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
  );
};

export default Select;

const styles = StyleSheet.create({
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
