import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInput from "../textInput";

interface formValues {
  values: {
    fullName: string;
    // email: string;
    phone: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      phone: string;
      // email: string;
    }>
  >;
}

const PersonalInfoForm = ({ values, setValues }: formValues) => {
  return (
    <View style={styles.container}>
      {details.map((e, _) => (
        <TextInput
          data={e}
          key={_}
          // value={values[e.name] || ''}
          value={values[e.name as keyof typeof values]}
          onChangeText={(text: string) =>
            setValues((prev) => ({ ...prev, [e.name]: text }))
          }
          keyboardType={e.name === "phone" ? "phone-pad" : "default"}
        />
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
    name: "fullName",
  },
  // {
  //   label: "Email",
  //   placeholder: "youremail@provider.domain",
  //   name: "email",
  // },
  {
    label: "Phone Number",
    placeholder: "+1234567890",
    name: "phone",
  },
];
