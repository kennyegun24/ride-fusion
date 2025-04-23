import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/auth/Header";
import { Link, router } from "expo-router";
import Select from "@/components/auth/Select";
import AccountCreated from "@/components/auth/AccountCreated";
import ValidateInput from "@/components/forms/ValidateInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema } from "@/schema/authValidationSchema";
import { driverCredentials } from "@/utils/driverCredentials";
import ValidateSelect from "@/components/forms/ValidateSelect";
import { useAuthenticate } from "@/providers/AuthProvider";
// import {OverScroll} from "@timotismjntk/react-native-overscroll-fix";
import { OverScrollView } from "react-native-overscroll";
type DriverFormValues = z.infer<typeof driverSchema>;

const signupDriver = () => {
  const [value, setValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const { authenticateUser } = useAuthenticate();
  const register = () => {
    setShowModal(true);
    authenticateUser("driver");
    setTimeout(() => {
      router.push("/driver");
    }, 2000);
  };
  const { control, handleSubmit } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      // driversLicense: "foreign",
      basicDetails: "",
      proofOfAddress: "",
      faceCaptureVerification: "",
      validPlatformAccounts: "",
      yearsOfExperience: "",
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar hidden={true} backgroundColor="red" /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Header
          header="Create Your Account"
          subHeader="Book cars near you anytime, anywhere. Let's get you moving"
        />
        {showModal && <AccountCreated />}
        <OverScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          alwaysBounceVertical
        >
          <ScrollView
            overScrollMode="always"
            style={{ paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 12 }}>
              {driverCredentials.map((e) => (
                <View key={e.key}>
                  {!e.options ? (
                    <ValidateInput
                      label={e.label}
                      name={e.key}
                      placeholder={e.placeholder}
                      control={control}
                      secureTextEntry={e.key === "password"}
                    />
                  ) : (
                    <ValidateSelect
                      placeholder={e?.placeholder}
                      data={e.options}
                      value={value}
                      control={control}
                      name={e.key}
                      label={e.label}
                    />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </OverScrollView>
        <View style={styles.btnContainer}>
          <Pressable onPress={register} style={styles.authButton}>
            <Text style={styles.authText}>Create Account</Text>
          </Pressable>
          <Link href={"/(auth)/login"} style={styles.authButton2}>
            <Text style={styles.authText2}>Already have an account</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signupDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    position: "relative",
  },
  content: {
    paddingVertical: 20,
  },
  scroll: { paddingVertical: 24 },
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 16 },
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
