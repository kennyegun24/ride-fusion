import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { Header } from "@/components/auth/Header";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AccountType } from "@/components/auth/AccountType";
import { router } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";

const { width } = Dimensions.get("window");

const SelectAccountType = () => {
  const [accountType, setAccountType] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const navigateToSignup = (e: string) => {
    if (e === "driver") {
      router.navigate("/(auth)/signup-driver");
    } else if (e === "owner") {
      router.navigate("/(auth)/signup-owner");
    } else {
      setVisible(true);
    }
  };
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar hidden={false} />
      <View
        style={[
          styles.container,
          { paddingTop: top + 12, position: "relative" },
        ]}
      >
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          style={{
            position: "absolute",
            bottom: 30,
            zIndex: 9999,
            left: 0,
            width: width - 16,
            backgroundColor: "red",
          }}
        >
          Select either option
        </Snackbar>
        <Text style={styles.headerText}>What would you like to do?</Text>
        <Text style={styles.subHeaderText}>
          Choose how you want to use the app today.
        </Text>
        <View style={{ marginTop: 42, gap: 16 }}>
          {options.map((e) => (
            <AccountType
              setAccountType={setAccountType}
              accountType={accountType}
              data={e}
              key={e.id}
            />
          ))}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => navigateToSignup(accountType)}
            style={[
              styles.continueButton,
              {
                backgroundColor: accountType.trim() !== "" ? "#269355" : "gray",
              },
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => router.push("/(auth)")}
            style={styles.haveAccountButton}
          >
            <Text style={styles.haveAccountText}>Already have an account?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SelectAccountType;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 16,
    marginBottom: 6,
    color: "#414141",
  },
  subHeaderText: { fontSize: 16, color: "#7F7F7F" },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  icon: {
    backgroundColor: "#26935517",
    height: "auto",
    padding: 8,
    borderRadius: 50,
  },
  btnContainer: { bottom: 100, position: "absolute", width, gap: 8 },
  continueButton: {
    backgroundColor: "#269355",
    borderRadius: 50,
    padding: 16,
    width: width * 0.9,
    marginHorizontal: "auto",
  },
  continueText: {
    color: "#fff",
    fontSize: 14,
    marginHorizontal: "auto",
  },
  haveAccountButton: {
    borderRadius: 50,
    padding: 16,
    width: width * 0.9,
    marginHorizontal: "auto",
  },
  haveAccountText: {
    color: "#269355",
    fontSize: 14,
    marginHorizontal: "auto",
  },
});

const options = [
  {
    icon: (
      <MaterialCommunityIcons
        style={styles.icon}
        name="steering"
        size={32}
        color="#269355"
      />
    ),
    id: 1,
    title: "Find a car to drive",
    desc: "Explore cars near you and hit the road in minutes—no stress, no hidden fees.",
    type: "driver",
  },
  {
    icon: (
      <Ionicons
        style={styles.icon}
        name="car-sport-outline"
        size={32}
        color="#269355"
      />
    ),
    id: 2,
    title: "List your car to earn",
    desc: "Share your car when you're not using it and turn it into steady income.",
    type: "owner",
  },
];
