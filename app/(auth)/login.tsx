import { StyleSheet, View } from "react-native";
import React from "react";
import { Header } from "@/components/auth/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "green", flex: 1 }}>
      <View
        style={{ paddingHorizontal: 12, flex: 1, backgroundColor: "green" }}
      >
        <Header
          header="Welcome Back"
          subHeader="Ready for your next ride? Sign in to continue"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
