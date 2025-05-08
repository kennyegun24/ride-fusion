import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import SearchBar from "./SearchBar";

type headerProps = {
  onSearchChange: (e: string) => Promise<void>;
  searchValue: string;
};

const Header = ({ onSearchChange, searchValue }: headerProps) => {
  const { top } = useSafeAreaInsets();
  const theme = useColorScheme();
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={80}
      style={{
        flex: 1,
        paddingTop: top + 8,
        paddingBottom: 8,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor:
          theme === "light" ? "rgba(226,226,226,0.7)" : "rgba(150,150,150,0.4)",
      }}
    >
      <Feather
        onPress={() => router.back()}
        style={{
          backgroundColor: "#269355",
          padding: 6,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        name="chevron-left"
        size={24}
        color="#fff"
      />
      <SearchBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        flex={1}
      />
    </BlurView>
  );
};

export default Header;

const styles = StyleSheet.create({
  searchStyle: {
    backgroundColor: "#171C2208",
    borderColor: "#E9E9E9",
    borderWidth: 1,
    marginVertical: 12,
    paddingVertical: 0,
    height: 35,
    maxHeight: 35,
    alignItems: "center",
    flex: 1,
  },
});
