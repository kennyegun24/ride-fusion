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
import { Link } from "expo-router";
import AccountCreated from "@/components/auth/AccountCreated";
import ValidateInput from "@/components/forms/ValidateInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema } from "@/schema/authValidationSchema";
import { driverCredentials } from "@/utils/driverCredentials";
import ValidateSelect from "@/components/forms/ValidateSelect";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import axios from "axios";
import { useRegistrationState } from "@/hooks/useRegisterationState";
import { useRequest } from "@/providers/RequestProvider";
type DriverFormValues = z.infer<typeof driverSchema>;

const signupDriver = () => {
  const [showModal, setShowModal] = useState(false);
  const { triggerLoader, sending } = useRequest();
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
          role: "driver",
          phone: e.phone,
          validPlatformAccounts: e.validPlatformAccounts,
          driversLicenseType: e.driversLicenseType,
          address: e.address,
          yearsOfExperience: e.yearsOfExperience,
        };
        await updateProfile(user, {
          displayName: e.fullName,
        });
        await setDoc(doc(db, "users", user.uid), {
          ...dataToSend,
          createdAt: new Date(),
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
        return;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    } finally {
      setShowModal(true);
      triggerLoader(false);
    }
  };
  const { control, handleSubmit } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      fullName: "Kenny Egun",
      email: "kennyegun240@gmail.com",
      phone: "+2348025464789",
      password: "Elias-2001",
      confirmPassword: "Elias-2001",
      address: "Block N18, flat 3, abesan estate, Ipaja, Lagos state",
      // proofOfAddress: "",
      // faceCaptureVerification: "",
      // validPlatformAccounts: "",
      yearsOfExperience: "2",
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <ScrollView
          // overScrollMode="always"
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 12, flex: 1, paddingVertical: 12 }}>
            {driverCredentials.map((e) => (
              <View key={e.key}>
                {!e.options ? (
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
                ) : (
                  <ValidateSelect
                    placeholder={e?.placeholder}
                    data={e.options}
                    control={control}
                    name={e.key}
                    label={e.label}
                  />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        {/* </OverScrollView> */}
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
  scroll: { paddingVertical: 24 },
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 16 },
  authButton: {
    backgroundColor: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
  btnContainer: { paddingVertical: 1, bottom: 0 },
  authText: { textAlign: "center", color: "#fff", fontSize: 14 },
  authButton2: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
  authText2: { textAlign: "center", color: "#269355", fontSize: 14 },
});
