import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";

export const AllCarsHeader = ({ params }: any) => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={80}
      style={{
        flex: 1,
        paddingTop: top + 8,
        paddingBottom: 8,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <Feather
        onPress={() => router.back()}
        style={{
          backgroundColor: "#269355",
          padding: 6,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        name="chevron-left"
        size={24}
        color="#fff"
      />
      <ThemedText style={styles.text}>{params.fullName} cars</ThemedText>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  header: {},
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
});
