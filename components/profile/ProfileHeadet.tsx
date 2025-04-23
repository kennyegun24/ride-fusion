import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderImageProps = {
  height?: number | string;
};

export const HeaderImage = ({ minHeight = 0 }) => {
  return (
    <View
      style={{
        position: "relative",
        // height: 300,
        minHeight: minHeight,
        alignItems: "center",
        marginTop: 46,
      }}
    >
      <Image
        source={require("@/assets/images/kenny.png")}
        style={{ height: 120, width: 120, borderRadius: 120 }}
      />
      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
            color: "#414141",
          }}
        >
          Kenny Elias
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            color: "#8B8B8B",
          }}
        >
          Ayubafemolajbshbsje20@gmail.com
        </Text>
      </View>
    </View>
  );
};

export default function ProfileHeader() {
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
      <HeaderLeft />
    </View>
  );
}

const HeaderLeft = () => {
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
          source={require("@/assets/images/kenny.png")}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>
            Kenny Elias
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 600, color: "#f4f4f4" }}>
            Ayubafemolajbshbsje20@gmail.com
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
