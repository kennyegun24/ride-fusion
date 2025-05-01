import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

type ImageAsset = {
  uri: string;
  fileName?: string;
  fileSize?: number;
};

type SelectedImagesProps = {
  images: ImageAsset[];
  remove: (uri: string) => void;
};

const SelectedImages = ({ images, remove }: SelectedImagesProps) => {
  return (
    <>
      {images?.length > 0 &&
        images.map((e, _) => (
          <View style={styles.image}>
            <Image source={{ uri: e.uri }} key={_} style={styles.image} />
            <AntDesign
              onPress={() => remove(e.uri)}
              name="closecircle"
              size={16}
              style={styles.removeBtn}
              color="red"
            />
          </View>
        ))}
    </>
  );
};

export default SelectedImages;

const styles = StyleSheet.create({
  image: {
    height: (width - 56) / 4,
    width: (width - 56) / 4,
    // flexBasis: 75,
    // flexGrow: 1,
    borderRadius: 12,
  },
  removeBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
