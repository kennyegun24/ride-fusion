import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import TextInput from "@/components/textInput";
import { ThemedView } from "@/components/ThemedView";
// import TextInput from "../textInput";

const ChangePassword = ({}) => {
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mapContent}>
            {details.map((e, _) => (
              <TextInput theme={theme} data={e} key={_} />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  mapContent: {
    gap: 12,
  },
});

const details = [
  {
    label: "Current Password",
    placeholder: "********",
    name: "",
  },
  {
    label: "New Password",
    placeholder: "********",
    name: "",
  },
  {
    label: "Confirm Password",
    placeholder: "********",
    name: "",
  },
];
