import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import TextInput from "@/components/textInput";
// import TextInput from "../textInput";

const ChangePassword = ({}) => {
  return (
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
            <TextInput data={e} key={_} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
