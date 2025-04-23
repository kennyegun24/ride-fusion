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
import { Link, router } from "expo-router";
import Select from "@/components/auth/Select";
import AccountCreated from "@/components/auth/AccountCreated";
import { ownerCredentials } from "@/utils/ownerCredentials";
import ValidateInput from "@/components/forms/ValidateInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ownerSchema } from "@/schema/authValidationSchema";
import { z } from "zod";
import ValidateSelect from "@/components/forms/ValidateSelect";
import { useAuthenticate } from "@/providers/AuthProvider";

type OwnerFormValue = z.infer<typeof ownerSchema>;

const signupDriver = () => {
  const [value, setValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const { authenticateUser } = useAuthenticate();
  const register = () => {
    setShowModal(true);
    authenticateUser("owner");
    setTimeout(() => {
      router.push("/(protected)/(tabs)");
    }, 2000);
  };
  const { control, handleSubmit } = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      fullName: "",
      mail: "",
      phone: "",
      password: "",
      confirmPassword: "",
      proofOfOwnership: "",
      faceCaptureVerification: "",
      carPictureWithPlate: "",
      registrationDisk: "",
      decra: "",
      rentalValue: "",
      rentalDeposit: "",
      // isInsured: "",
      // hasTracker: "",
      // hasDashCam: "",
      mileage: "",
      engineSize: "",
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar hidden={true} backgroundColor="red" /> */}
      {showModal && <AccountCreated />}
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header
          header="Create Your Account"
          subHeader="Let other people rent your car for money!"
        />

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12 }}>
            {ownerCredentials.map((e) => (
              <View key={e.key}>
                {e.type !== "boolean" ? (
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
        <View style={styles.btnContainer}>
          <Pressable onPress={register} style={styles.authButton}>
            <Text style={styles.authText}>Create Account</Text>
          </Pressable>
          <Link href={"/(auth)/login"} style={styles.authButton2}>
            <Text style={styles.authText2}>Already have an account</Text>
          </Link>
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
