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
import ValidateInput from "@/components/forms/ValidateInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidateSelect from "@/components/forms/ValidateSelect";
import { basicCarInfoFields } from "@/utils/list-car";
import { basicCarSchema } from "@/schema/list-car-validationSchema";

type DriverFormValues = z.infer<typeof basicCarSchema>;

const signupDriver = () => {
  const procees = (e: any) => {
    router.navigate({
      pathname: "/list-car/availability",
      params: {
        ...e,
      },
    });
  };
  const { control, handleSubmit } = useForm<DriverFormValues>({
    resolver: zodResolver(basicCarSchema),
    defaultValues: {
      car_name: "Toyota Corolla",
      brand: "Toyota",
      carType: "SUV",
      model: 2025,
      transmission: "Automatic",
      fuelType: "Electric",
      seats: 5,
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
          header="Basic Car Info"
          subHeader="Put the basic information about your car before proceeding."
        />
        <ScrollView
          overScrollMode="always"
          style={{ paddingVertical: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 12 }}>
            {basicCarInfoFields.map((e) => (
              <View key={e.key}>
                {!e.options ? (
                  <ValidateInput
                    label={e.label}
                    name={e.key}
                    placeholder={e.placeholder}
                    control={control}
                    keyboardType={
                      e.type === "number" ? "number-pad" : "default"
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
        <View style={styles.btnContainer}>
          <Pressable onPress={handleSubmit(procees)} style={styles.authButton}>
            <Text style={styles.authText}>Proceed</Text>
          </Pressable>
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
