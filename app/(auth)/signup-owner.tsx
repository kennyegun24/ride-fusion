import {
  KeyboardAvoidingView,
  Platform,
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
import { Link } from "expo-router";
import AccountCreated from "@/components/auth/AccountCreated";
import { ownerCredentials } from "@/utils/ownerCredentials";
import ValidateInput from "@/components/forms/ValidateInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ownerSchema } from "@/schema/authValidationSchema";
import { z } from "zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import RequestSend from "@/components/global/requestSend";
import { useRegistrationState } from "@/hooks/useRegisterationState";
import { API_ROUTE } from "@/utils/apiRoute";
import { ThemedView } from "@/components/ThemedView";
import { useToast } from "@/providers/ToastProvider";
import { useRequest } from "@/providers/RequestProvider";

type OwnerFormValue = z.infer<typeof ownerSchema>;

const signupDriver = () => {
  const { triggerLoader, sending } = useRequest();
  const theme = useColorScheme();
  const { showToast } = useToast();
  const register = async (e: any) => {
    try {
      triggerLoader(true);
      const createUser = await createUserWithEmailAndPassword(
        auth,
        e?.email,
        e?.password
      );
      const user = await createUser?.user;
      // SAVE OTHER DETAILS TO DB
      if (user) {
        const dataToSend = {
          uid: user.uid,
          fullName: e.fullName,
          email: e.email,
          role: "owner",
          phone: e.phone,
          address: e.address,
          state: e.state,
          city: e.city,
        };
        await setDoc(doc(db, "users", user.uid), {
          ...dataToSend,
          createdAt: new Date(),
        });
        await updateProfile(user, {
          displayName: e.fullName,
        });
        const idToken = await user.getIdToken();
        await axios.post(
          `${API_ROUTE}auth/register`,
          { ...dataToSend },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        useRegistrationState.getState().setRegistrationComplete(true);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        if (
          errorCode === "auth/invalid-credential" ||
          errorCode === "auth/email-already-in-use" ||
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
      return showToast({
        toastType: "error",
        text1: "Something went wrong",
      });
    } finally {
      triggerLoader(false);
    }
  };

  const { control, handleSubmit } = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      state: "",
      city: "",
    },
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Header
              header="Create Your Account"
              subHeader="Let other people rent your car for money!"
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 12, flex: 1, paddingVertical: 12 }}>
                {ownerCredentials.map((e) => (
                  <View key={e.key}>
                    <ValidateInput
                      label={e.label}
                      name={e.key}
                      placeholder={e.placeholder}
                      control={control}
                      secureTextEntry={e.key.toLowerCase().includes("password")}
                      keyboardType={
                        e.key === "email"
                          ? "email-address"
                          : e.key === "phone"
                          ? "phone-pad"
                          : "default"
                      }
                      theme={theme}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.btnContainer}>
              <Pressable
                onPress={sending ? null : handleSubmit(register)}
                style={[
                  styles.authButton,
                  {
                    backgroundColor: sending ? "gray" : "#269355",
                  },
                ]}
              >
                <Text style={styles.authText}>Create Account</Text>
              </Pressable>
              <Link href={"/(auth)"} style={styles.authButton2}>
                <Text style={styles.authText2}>Already have an account</Text>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default signupDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  // scroll: { paddingVertical: 24 },
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
