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
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const SelectAccountType = () => {
  const [accountType, setAccountType] = useState<string>("");
  const { top } = useSafeAreaInsets();
  console.log(top);
  return (
    <SafeAreaProvider style={{ backgroundColor: "green", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            // minHeight: height - top,
            paddingTop: top,
            backgroundColor: "red",
          }}
        >
          <Header
            header="What would you like to do?"
            subHeader="Choose how you want to use the app today."
          />
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
          <View style={{ bottom: 100, position: "absolute", width, gap: 8 }}>
            <TouchableOpacity style={styles.continueButton} activeOpacity={0.7}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => router.push("/(auth)/login")}
              style={styles.haveAccountButton}
            >
              <Text style={styles.haveAccountText}>
                Already have an account?
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SelectAccountType;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#26935517",
    height: "auto",
    padding: 8,
    borderRadius: 50,
  },
  continueButton: {
    backgroundColor: "#269355",
    borderRadius: 50,
    padding: 16,
    width: width * 0.9,
    marginHorizontal: "auto",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
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
