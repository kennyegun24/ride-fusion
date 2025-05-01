import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface HeaderProps {
  header: string;
  subHeader: string;
}

export const Header: FC<HeaderProps> = ({ header, subHeader }) => {
  return (
    <View style={{ paddingBottom: 12 }}>
      <TouchableWithoutFeedback
        style={styles.touchable}
        onPress={() => router.back()}
      >
        <View style={styles.backView}>
          <FontAwesome name="chevron-left" size={20} color={"#414141"} />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>{header}</Text>
      <Text style={styles.subHeaderText}>{subHeader}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 50,
  },
  backView: { flexDirection: "row", alignItems: "center", gap: 4 },
  backText: { fontSize: 16, color: "#414141" },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 16,
    marginBottom: 6,
    color: "#414141",
  },
  subHeaderText: { fontSize: 15, color: "#7F7F7F" },
});
