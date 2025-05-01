import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type ImageAsset = {
  uri: string;
  fileName?: string;
  fileSize?: number;
  name: string;
  type: string;
};

interface imagePickerProps {
  setImages: React.Dispatch<React.SetStateAction<ImageAsset[]>>;
  width: number;
}

const UploadImageButton = ({ setImages, width }: imagePickerProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 9,
    });

    if (!result.canceled) {
      const newAssets: ImageAsset[] = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName ?? `image-${Date.now()}`,
        fileName: asset.fileName ?? undefined,
        fileSize: asset.fileSize ?? undefined,
        type: asset.type || "default-type",
      }));

      setImages((prevImages) => {
        const isDuplicate = (a: ImageAsset, b: ImageAsset) =>
          a.fileName === b.fileName && a.fileSize === b.fileSize;

        const remainingSlots = 9 - prevImages.length;

        const filtered = newAssets
          .filter(
            (newAsset) =>
              newAsset.fileName &&
              newAsset.fileSize &&
              newAsset.type &&
              !prevImages.some((img) => isDuplicate(img, newAsset))
          )
          .slice(0, remainingSlots); // limit to remaining allowed slots

        return [...prevImages, ...filtered];
      });
    }
  };
  return (
    <Pressable
      onPress={pickImage}
      style={[
        styles.uploadBtnContainer,
        { height: (width - 56) / 4, width: (width - 56) / 4 },
      ]}
    >
      <Ionicons
        style={styles.icon}
        name="cloud-upload-outline"
        size={24}
        color="#269355"
      />
    </Pressable>
  );
};

export default UploadImageButton;

const styles = StyleSheet.create({
  uploadBtnContainer: {
    backgroundColor: "#26935521",
    borderWidth: 1,
    borderColor: "#269355",
    borderStyle: "dashed",
    // width: 75,
    // height: 75,
    borderRadius: 12,
  },
  icon: {
    margin: "auto",
  },
});
