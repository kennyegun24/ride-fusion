import React from "react";
import {
  MaterialIcons,
  Feather,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  Octicons,
  EvilIcons,
} from "@expo/vector-icons";
import { ReactElement } from "react";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { View } from "react-native";

type SettingsItem = {
  label: string;
  icon: any;
  action: string;
  color?: string;
  name: string;
  type?: string;
};

export const settingsItems: SettingsItem[] = [
  {
    label: "Personal Information",
    action: "(userProfile)",
    icon: MaterialIcons,
    name: "person-outline",
  },
  {
    label: "Change Password",
    action: "change-password",
    icon: Octicons,
    name: "key",
  },
  {
    label: "Support",
    action: "support",
    icon: MaterialIcons,
    name: "support-agent",
  },
  {
    label: "Sign out",
    color: "#FF5A5F",
    action: "signOut",
    icon: Entypo,
    name: "log-out",
    type: "modal",
  },
  {
    label: "Delete account",
    color: "#FF0000",
    action: "deleteAccount",
    icon: EvilIcons,
    name: "trash",
    type: "modal",
  },
];
