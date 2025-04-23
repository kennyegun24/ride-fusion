import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/auth/Header";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const signupDriver = () => {
  const [value, setValue] = useState<string>("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar hidden={true} backgroundColor="red" /> */}
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header
          header="Welcome Back"
          subHeader="Ready for your next ride? Sign in to continue"
        />

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12 }}>
            {driverCredentials.map((e) => (
              <View key={e.key}>
                <Text style={styles.labelStyle}>{e.label}</Text>

                <TextInput
                  onChangeText={(e) => {}}
                  placeholder={e.placeholder}
                  style={styles.textInput}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <Pressable style={styles.authButton}>
            <Text style={styles.authText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signupDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
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
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 18 },
  authButton: {
    backgroundColor: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 50,
  },
  btnContainer: { paddingVertical: 12 },
  authText: { textAlign: "center", color: "#fff", fontSize: 18 },
  authButton2: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 50,
  },
  authText2: { textAlign: "center", color: "#269355", fontSize: 14 },
});

interface SelectProps {
  placeholder: string;
  data: any[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const driverCredentials = [
  {
    key: "mail",
    label: "Email Address",
    placeholder: "example@mail.com",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Enter a secure password",
    required: true,
  },
];
