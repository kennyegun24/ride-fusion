import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface imagePickerProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  label: string;
  desc: string;
}
const ImagePickerComponent = ({
  image,
  setImage,
  label,
  desc,
}: imagePickerProps) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.imageSelectContainer}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Pressable style={styles.imageSelectButton} onPress={pickImage}>
        {/* <View> */}
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.uploadLabelContainer}>
            <Ionicons name="cloud-upload-outline" size={24} color="#269355" />
            <Text style={styles.uploadText}>{desc}</Text>
          </View>
        )}
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imageSelectContainer: { marginTop: 12 },
  imageSelectButton: {
    backgroundColor: "#171C2208",
    borderColor: "#E9E9E9",
    borderWidth: 1,
    width: "100%",
    height: 250,
    borderRadius: 28,
    marginTop: 6,
    overflow: "hidden",
  },
  uploadLabelContainer: {
    margin: "auto",
    alignItems: "center",
  },
  uploadText: {
    color: "#8B8B8B",
  },
  image: {
    flex: 1,
    objectFit: "contain",
  },
  labelStyle: { color: "#4B524E", fontWeight: 600, fontSize: 16 },
});
