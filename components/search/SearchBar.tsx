import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import { router } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";

type searchProps = {
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  press?: boolean;
  onSearchChange?: (e: string) => Promise<void>;
  flex?: number;
  top?: number;
};

const SearchBar = ({
  setSearchValue,
  searchValue,
  press,
  onSearchChange,
  flex,
  top,
}: searchProps) => {
  const theme = useColorScheme();
  return (
    <Searchbar
      onChangeText={setSearchValue || onSearchChange}
      value={searchValue}
      onPress={() => (press ? router.push("/(protected)/searched-cars") : null)}
      placeholder="Search"
      placeholderTextColor={theme === "dark" ? "#fff" : "#111"}
      inputStyle={{
        minHeight: 35,
        maxHeight: 35,
        color: theme === "dark" ? "#fff" : "#111",
      }}
      style={[
        styles.searchStyle,
        {
          borderColor: theme === "dark" ? "#E0E0E040" : "#E9E9E9",
          backgroundColor: theme === "dark" ? "#FFFFFF08" : "#171C2208",
          flex: flex,
          marginTop: top || 12,
        },
      ]}
      icon={() => (
        <EvilIcons
          name="search"
          size={24}
          color={theme === "dark" ? "#fff" : "#111"}
        />
      )}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchStyle: {
    backgroundColor: "#000",
    // borderColor: "#E9E9E9",
    borderWidth: 1,
    marginVertical: 12,
    paddingVertical: 0,
    height: 35,
    maxHeight: 35,
    alignItems: "center",
    // flex: 1,
  },
});
