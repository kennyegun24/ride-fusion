import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";

export const AllUsersProfileHeader = ({ minHeight = 0, params }: any) => {
  return (
    <View
      style={[
        styles.container,
        {
          minHeight: minHeight,
        },
      ]}
    >
      <Pressable style={styles.imagePressable}>
        <Image
          source={
            params?.downloadURL
              ? { uri: params.downloadURL }
              : require("@/assets/images/no_image.png")
          }
          style={styles.image}
        />
        {/* <Feather name="edit" size={24} color="black" style={styles.editIcon} /> */}
      </Pressable>
      <View style={{ marginTop: 12 }}>
        <ThemedText style={styles.name}>{params?.fullName}</ThemedText>
        <ThemedText style={styles.email}>{params?.email}</ThemedText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 46,
    position: "relative",
  },
  imagePressable: { borderRadius: 120 },
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
    color: "#8B8B8B",
  },
});
