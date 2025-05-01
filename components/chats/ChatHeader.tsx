import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export const Header = (params: any) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top + 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <HeaderLeft {...params} />
    </View>
  );
};

const HeaderLeft = (params: any) => {
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
        onPress={() => router.navigate("/(profile)")}
      >
        <Image
          source={{ uri: params.downloadURL }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
          {params.displayName}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
