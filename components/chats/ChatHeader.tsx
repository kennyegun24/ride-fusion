import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { RelativePathString, router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";

export const HeaderImage = (params: any) => {
  // const params = useLocalSearchParams();
  return (
    <View style={{ position: "relative", height: 300 }}>
      <Image
        source={{ uri: params.downloadURL }}
        style={{ height: 300, width: "100%" }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 60,
          left: 10,
          fontSize: 28,
          fontWeight: "700",
          color: "#fff",
        }}
      >
        {params?.displayName}
      </Text>
    </View>
  );
};

export const Header = ({ theme, ...params }: any) => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      tint={theme === "dark" ? "dark" : "extraLight"}
      intensity={70}
      style={{
        paddingTop: top + 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor:
          theme === "light" ? "rgba(226,226,226,0.7)" : "rgba(150,150,150,0.4)",
        paddingBottom: 8,
        // flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderLeft theme={theme} {...params} />
    </BlurView>
  );
};

const HeaderLeft = ({ theme, ...params }: any) => {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Feather
        onPress={() => router.back()}
        name="chevron-left"
        size={24}
        color={theme === "dark" ? "#fff" : "#000"}
      />
      <Pressable
        style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
        onPress={() =>
          router.navigate({
            pathname: "/(profile)" as RelativePathString,
            params: {
              uid: params.uid,
            },
          })
        }
      >
        <Image
          source={{ uri: params.downloadURL }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <ThemedText style={{ fontSize: 20, fontWeight: 600 }}>
          {params.displayName}
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
