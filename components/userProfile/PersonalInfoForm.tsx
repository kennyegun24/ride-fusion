import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInput from "../textInput";

const PersonalInfoForm = ({}) => {
  return (
    <View style={styles.container}>
      {details.map((e, _) => (
        <TextInput data={e} key={_} />
      ))}
    </View>
  );
};

export default PersonalInfoForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});

const details = [
  {
    label: "Full Name",
    placeholder: "First and last name",
    name: "",
  },
  {
    label: "Email",
    placeholder: "youremail@provider.domain",
    name: "",
  },
  {
    label: "Phone Number",
    placeholder: "+1234567890",
    name: "",
  },
];
