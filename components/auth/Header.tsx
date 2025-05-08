import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";

interface HeaderProps {
  header: string;
  subHeader: string;
}

export const Header: FC<HeaderProps> = ({ header, subHeader }) => {
  const theme = useColorScheme();
  return (
    <View style={{ paddingBottom: 12 }}>
      <TouchableWithoutFeedback
        style={styles.touchable}
        onPress={() => router.back()}
      >
        <View style={styles.backView}>
          <FontAwesome
            name="chevron-left"
            size={20}
            color={theme === "light" ? "#414141" : "#d9d9d9"}
          />
          <ThemedText lightColor="#414141" style={styles.backText}>
            Back
          </ThemedText>
        </View>
      </TouchableWithoutFeedback>
      <ThemedText
        lightColor="#414141"
        darkColor="#d9d9d9"
        style={styles.headerText}
      >
        {header}
      </ThemedText>
      <ThemedText
        lightColor="#7F7F7F"
        darkColor="#a1a1a1"
        style={styles.subHeaderText}
      >
        {subHeader}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 50,
  },
  backView: { flexDirection: "row", alignItems: "center", gap: 4 },
  backText: { fontSize: 16 },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 16,
    marginBottom: 6,
    // color: "#414141",
  },
  subHeaderText: { fontSize: 15 },
});
