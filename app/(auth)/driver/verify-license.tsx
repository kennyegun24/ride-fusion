import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TwinButtons from "@/components/TwinButtons";
import { router } from "expo-router";
import TextInput from "@/components/textInput";
import ImagePickerComponent from "@/components/ImagePicker";

const index = () => {
  const [image, setImage] = useState<string | null>(null);
  const onPressFirst = () => router.back();
  const onPressSecond = () => router.navigate("/driver/id-passport");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify your license</Text>
      <Text style={styles.desc}>
        Upload a clear photo of your valid driver’s license. This helps us keep
        the platform safe and trustworthy.
      </Text>

      <View style={styles.fieldsContainer}>
        <TextInput
          data={{
            label: `Driver's License ID`,
            placeholder: "vfukls-asds-wewkdj",
          }}
        />

        <ImagePickerComponent
          desc="Upload Driver's License"
          image={image}
          label="Driver’s License Image"
          setImage={setImage}
        />
      </View>

      <View style={styles.btnContainer}>
        <TwinButtons
          first_text="Back"
          second_text="Next"
          onPressFirst={onPressFirst}
          onPressSecond={onPressSecond}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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
