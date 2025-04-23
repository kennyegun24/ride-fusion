import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("screen");

interface BlurModalChildProps {
  children: ReactNode;
  // action: string;
  closeModal?: () => void;
}

interface props {}

const BlurModal = ({ children, closeModal }: BlurModalChildProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="dark"
        intensity={5}
        style={[styles.container, { marginTop: -top }]}
      >
        {/* Prevent touch events from bubbling through the modal content */}
        <Pressable style={styles.contentContainer} onPress={() => {}}>
          {children}
        </Pressable>
      </BlurView>
    </TouchableWithoutFeedback>
  );
};

export default BlurModal;

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
