import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TwinButtons from "@/components/TwinButtons";
import { router } from "expo-router";
import Select from "@/components/auth/Select";

const index = () => {
  const onPressFirst = () => router.back();
  const onPressSecond = () => router.navigate("/driver/e-hailing");
  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>E-hailing or Driving Experience</Text>
      <Text style={styles.desc}>
        Have you driven for Bolt, Uber, or any e-hailing platform? Let us know
        where and how long you’ve been driving.
      </Text>

      <View style={styles.fieldsContainer}>
        {data.map((e, _) => (
          <View key={_}>
            <Text style={styles.labelStyle}>{e.label}</Text>
            <Select
              key={_}
              placeholder={e?.placeholder}
              data={e.options}
              value={value}
              setValue={setValue}
            />
          </View>
        ))}
      </View>

      <View style={styles.btnContainer}>
        <TwinButtons
          first_text="Back"
          second_text="Finish"
          onPressFirst={onPressFirst}
          onPressSecond={onPressSecond}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 16 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  header: { fontSize: 20, fontWeight: 600, color: "#414141" },
  desc: { fontSize: 14, color: "#8B8B8B", marginTop: 8 },

  fieldsContainer: {
    gap: 8,
    marginTop: 24,
  },
  btnContainer: {
    marginTop: "auto",
  },
});

const data = [
  {
    key: "driversLicense",
    label: "E-hailing Platform",
    options: [
      { label: "None", value: "none" },
      { label: "Uber", value: "uber" },
      { label: "In Drive", value: "indrive" },
      { label: "Bolt", value: "bold" },
    ],
    placeholder: "Select your platform",
    required: true,
  },
  {
    key: "yearsOfExperience",
    label: "Years of Experience",
    options: [
      { label: "5+ Years", value: "5" },
      { label: "3-5 Years", value: "3-5" },
      { label: "1 - 3 Years", value: "1-3" },
      { label: "<1 Year", value: "less_than_one" },
    ],
    placeholder: "Select your platform",
    required: true,
  },
];
