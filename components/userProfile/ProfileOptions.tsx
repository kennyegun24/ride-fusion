import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { settingsItems } from "@/utils/profileOptions";
import { MaterialIcons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";

interface ProfileOptionsProps {
  setAction: React.Dispatch<React.SetStateAction<string>>;
  theme: ColorSchemeName;
}
const ProfileOptions = ({ setAction, theme }: ProfileOptionsProps) => {
  return (
    <View style={styles.container}>
      {settingsItems.map((setting, _) => (
        <Pressable
          onPress={() =>
            setting.type
              ? setAction(setting.action)
              : router.navigate(`/${setting.action}` as RelativePathString)
          }
          style={({ pressed }) => [
            styles.pressable,
            {
              backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent", // Dark overlay
              borderBottomColor: theme === "dark" ? "#E0E0E040" : "#F3F3F3",
            },
          ]}
          key={_}
        >
          <View style={styles.settingOption}>
            <setting.icon
              name={setting.name}
              color={
                setting.color
                  ? setting.color
                  : theme === "light"
                  ? "#414141"
                  : "#a1a1a1"
              }
              size={18}
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color: setting.color
                    ? setting.color
                    : theme === "light"
                    ? "#414141"
                    : "#a1a1a1",
                },
              ]}
            >
              {setting.label}
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={theme === "light" ? "#414141" : "#a1a1a1"}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12 },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    // borderBottomColor: "#F3F3F3",
    // backgroundColor: "red",
  },
  settingOption: { flexDirection: "row", alignItems: "center", gap: 6 },
  optionLabel: {
    fontSize: 16,
    fontWeight: 400,
  },
});
