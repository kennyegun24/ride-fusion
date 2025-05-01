import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/auth/Header";
import { router, useLocalSearchParams } from "expo-router";
import UploadImageButton from "@/components/list-car/uploadImageButton";
import SelectedImages from "@/components/list-car/SelectedImages";
import { uploadImages } from "@/utils/uploadToCloudinary";
import useAuth from "@/hooks/userAuth";
import axios from "axios";

const { width } = Dimensions.get("screen");

type ImageAsset = {
  uri: string;
  name: string;
  fileSize?: number;
  type: string;
};

const signupDriver = () => {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const { user } = useAuth();
  const params = useLocalSearchParams();

  const procees = async () => {
    const idToken = await user?.getIdToken();
    // router.push("/list-car/documentation");
    try {
      if (user) {
        const downloadURI = await uploadImages(images, user);
        await axios.post(
          "http://172.20.10.3:4000/api/cars/create-car",
          {
            images: downloadURI,
            ...params,
            features: {
              seats: params.seats,
              transmission: params.transmission,
              fuelType: params.fuelType,
            },
            carMilage: "5000",
            carDisc: "NaN",
            dekra_report: "NaN",
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveImage = (uri: string) => {
    const filter = images.filter((e) => e.uri !== uri);
    setImages(filter);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Header
          header="Documentation "
          subHeader="Upload valid documents to verify your car. And also a max of 10 images of your car for people to see."
        />
        <ScrollView
          overScrollMode="always"
          style={{ paddingVertical: 24, flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>
            Vehicle Image{" "}
            <Text style={styles.subHeader}>(at least 5 images)</Text>
          </Text>
          <View style={styles.imageContainer}>
            <UploadImageButton setImages={setImages} width={width} />
            <SelectedImages remove={onRemoveImage} images={images} />
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <Pressable onPress={procees} style={styles.authButton}>
            <Text style={styles.authText}>List Car</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  header: {
    fontSize: 18,
    fontWeight: 600,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 400,
    color: "#8B8B8B",
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
  imageContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 6,
    // justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
