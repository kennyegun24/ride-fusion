import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/auth/Header";
import { Link, router, useLocalSearchParams } from "expo-router";
import ValidateInput from "@/components/forms/ValidateInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidateSelect from "@/components/forms/ValidateSelect";
import {
  availabilityPricingFields,
  basicCarInfoFields,
} from "@/utils/list-car";
import { availabilitySchema } from "@/schema/list-car-validationSchema";
import ValidateITextArea from "@/components/forms/ValidateTextArea";
import { ThemedView } from "@/components/ThemedView";

type DriverFormValues = z.infer<typeof availabilitySchema>;

const signupDriver = () => {
  const params = useLocalSearchParams();
  const procees = (e: any) => {
    router.navigate({
      pathname: "/list-car/documentation",
      params: {
        ...e,
        ...params,
      },
    });
  };
  const { control, handleSubmit } = useForm<DriverFormValues>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      location: "Nigeria",
      state: "Lagos",
      available: "Weekends",
      rentalPricePerDay: 10000,
      rental_deposit: 3000,
      rentalTerms: "No smoking and drifting",
      description: `Looking for a reliable and comfortable ride? Rent this [Car Name], perfect for your next adventure or business trip. Whether you're going on a road trip, need a family car, or just want to explore, this car has it all!
`,
    },
  });
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <StatusBar style="auto" />
          <Header
            header="Availability & Pricing"
            subHeader="Fill in your car's rental details and availability."
          />
          <ScrollView
            overScrollMode="always"
            style={{ paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 12 }}>
              {availabilityPricingFields.map((e) => (
                <View key={e.key}>
                  {e.type === "textarea" ? (
                    <ValidateITextArea
                      label={e.label}
                      name={e.key}
                      placeholder={e.placeholder}
                      control={control}
                      theme={theme}
                    />
                  ) : !e.options ? (
                    <ValidateInput
                      theme={theme}
                      label={e.label}
                      name={e.key}
                      placeholder={e.placeholder}
                      control={control}
                      secureTextEntry={e.key === "password"}
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
                      theme={theme}
                    />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.btnContainer}>
            <Pressable
              onPress={handleSubmit(procees)}
              style={styles.authButton}
            >
              <Text style={styles.authText}>Proceed</Text>
            </Pressable>
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
