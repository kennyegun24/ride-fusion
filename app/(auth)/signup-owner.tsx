import {
  KeyboardAvoidingView,
  Platform,
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
import { Link, router } from "expo-router";
import AccountCreated from "@/components/auth/AccountCreated";
import { ownerCredentials } from "@/utils/ownerCredentials";
import ValidateInput from "@/components/forms/ValidateInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ownerSchema } from "@/schema/authValidationSchema";
import { z } from "zod";
import ValidateSelect from "@/components/forms/ValidateSelect";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import RequestSend from "@/components/global/requestSend";
import { useRegistrationState } from "@/hooks/useRegisterationState";

type OwnerFormValue = z.infer<typeof ownerSchema>;

const signupDriver = () => {
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const register = async (e: any) => {
    try {
      setSending(true);
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
          "http://172.20.10.3:4000/api/auth/register",
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
        const errorMessage = error.message;
      }
    } finally {
      setShowModal(true);
      setSending(false);
    }
  };

  const { control, handleSubmit } = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      fullName: "Elias Ken",
      email: "kennyelias123@gmail.com",
      phone: "+2348025464789",
      password: "Elias2001-",
      confirmPassword: "Elias2001-",
      address: "Block N18",
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {showModal && <AccountCreated />}
        {sending && <RequestSend />}
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
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.btnContainer}>
            <Pressable
              onPress={handleSubmit(register)}
              style={styles.authButton}
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
