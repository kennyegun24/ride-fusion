import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/auth/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schema/authValidationSchema";
import ValidateInput from "@/components/forms/ValidateInput";
import { useRegistrationState } from "@/hooks/useRegisterationState";
import { ThemedView } from "@/components/ThemedView";
import { FirebaseError } from "firebase/app";
import { useToast } from "@/providers/ToastProvider";
import { useRequest } from "@/providers/RequestProvider";
type LoginFormSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const { triggerLoader, sending } = useRequest();
  const theme = useColorScheme();
  const { showToast } = useToast();
  const login = async (e: any) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        e?.email,
        e?.password
      );
      if (user?.user) {
        useRegistrationState.getState().setRegistrationComplete(true);
        // router.push("/(protected)/(tabs)");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        if (
          errorCode === "auth/invalid-credential" ||
          errorCode === "auth/invalid-email" ||
          errorCode === "auth/wrong-password"
        ) {
          return showToast({
            text1: "Invalid credentials",
            text2: "Password or Email is wrong",
            toastType: "error",
          });
        } else if (errorCode === "auth/too-many-requests") {
          return showToast({
            text1: "Too many attempts",
            text2: "Try again later",
            toastType: "error",
          });
        }
      }
      console.log(error, "err");
      return showToast({
        toastType: "error",
        text1: "Something went wrong",
      });
    } finally {
      triggerLoader(false);
    }
  };
  const { control, handleSubmit } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <StatusBar hidden={true} backgroundColor="red" /> */}
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Header
            header="Welcome Back"
            subHeader="Ready for your next ride? Sign in to continue"
          />

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 12 }}>
              {loginCredentials.map((e) => (
                <View key={e.key}>
                  <ValidateInput
                    placeholder={e.placeholder}
                    control={control}
                    label={e.label}
                    name={e.key}
                    theme={theme}
                    keyboardType={
                      e.key === "email" ? "email-address" : "default"
                    }
                    secureTextEntry={e.key === "password"}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.btnContainer}>
            <Pressable
              onPress={sending ? null : handleSubmit(login)}
              style={[
                styles.authButton,
                {
                  backgroundColor: sending ? "gray" : "#269355",
                },
              ]}
            >
              <Text style={styles.authText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Login;

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
    // backgroundColor: "#269355",
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

const loginCredentials = [
  {
    key: "email",
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
