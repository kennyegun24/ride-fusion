import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlurModal from "../BlurModal";

const { height, width } = Dimensions.get("screen");
const AccountCreated = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurModal>
      <Image
        source={require("@/assets/images/account-created.png")}
        style={{ marginHorizontal: "auto", marginBottom: 24 }}
      />
      <Text style={styles.titleText}>Congratulations!</Text>
      <Text style={styles.descText}>
        Your account has been created successfully, proceed to rent any car of
        your choice
      </Text>
      <Pressable style={styles.authButton}>
        <Text style={styles.authText}>Proceed</Text>
      </Pressable>
    </BlurModal>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: -12,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    height,
    width,
    zIndex: 999,
    position: "absolute",
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingVertical: 32,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 10,
  },
  titleText: {
    color: "#269355",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 4,
  },
  descText: {
    color: "#4f4f4f",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 48,
    marginHorizontal: "auto",
    width: "70%",
  },
  authButton: {
    backgroundColor: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 50,
  },
  authText: { textAlign: "center", color: "#fff", fontSize: 18 },
});
