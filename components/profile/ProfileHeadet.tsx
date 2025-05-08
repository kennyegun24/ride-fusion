import useAuth from "@/hooks/userAuth";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { uploadImages } from "@/utils/uploadToCloudinary";
import { updateUserProfile } from "@/helper/updateProfile";
import { useRequest } from "@/providers/RequestProvider";
import { ThemedText } from "../ThemedText";

export const HeaderImage = ({ minHeight = 0 }) => {
  const { user } = useAuth();
  const [image, setImage] = useState("");
  const { triggerLoader } = useRequest();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      triggerLoader(true);
      const uri = result.assets[0].uri;
      const newFile = {
        uri,
        type: `test/${uri.split(".")[1]}`,
        name: `test/${uri.split(".")[1]}`,
      };
      if (user?.uid && user?.displayName) {
        try {
          const idToken = await user?.getIdToken();
          const downloadURL = await uploadImages([newFile], user);
          await updateProfile(user, {
            photoURL: downloadURL[0],
          });

          await updateUserProfile({
            idToken,
            serverUrl: "auth/update",
            updateData: { downloadURL: downloadURL[0] },
            userId: user?.uid,
          });
          setImage(uri);
        } catch (err) {
          console.log(err);
        } finally {
          triggerLoader(false);
        }
      }
      triggerLoader(false);
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          minHeight: minHeight,
        },
      ]}
    >
      <Pressable onPress={pickImage} style={styles.imagePressable}>
        <Image
          source={
            image
              ? { uri: image }
              : user?.photoURL
              ? { uri: user?.photoURL }
              : require("@/assets/images/no_image.png")
          }
          style={styles.image}
        />
        <Feather name="edit" size={24} color="black" style={styles.editIcon} />
      </Pressable>
      <View style={{ marginTop: 12 }}>
        <ThemedText lightColor="#414141" style={styles.name}>
          {user?.displayName}
        </ThemedText>
        <ThemedText
          lightColor="#8B8B8B"
          darkColor="#a1a1a1"
          style={styles.email}
        >
          {user?.email}
        </ThemedText>
      </View>
    </View>
  );
};

export default function ProfileHeader({ params }: any) {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.profileHeader,
        {
          paddingTop: top + 8,
        },
      ]}
    >
      <HeaderLeft params={params} />
    </View>
  );
}

const HeaderLeft = ({ params }: any) => {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Feather
        onPress={() => router.back()}
        name="chevron-left"
        size={24}
        color="#fff"
      />
      <Pressable
        style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
        onPress={() => router.navigate("/(protected)/(profile)")}
      >
        <Image
          source={
            params?.downloadURL
              ? { uri: params.downloadURL }
              : require("@/assets/images/no_image.png")
          }
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
            {params.fullName}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 600, color: "#f4f4f4" }}>
            {params.email}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 46,
    position: "relative",
  },
  imagePressable: { backgroundColor: "green", borderRadius: 120 },
  image: {
    height: 120,
    width: 120,
    borderRadius: 120,
    objectFit: "cover",
  },
  editIcon: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
    // color: "#414141",
  },
  email: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    // color: "#8B8B8B",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
