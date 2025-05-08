import { FC } from "react";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";

interface AccountTypeData {
  type: string;
  title: string;
  desc: string;
  icon: JSX.Element;
}

interface accountTypeProps {
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  accountType: string;
  data: AccountTypeData;
  theme: ColorSchemeName;
}

export const AccountType: FC<accountTypeProps> = ({
  accountType,
  data,
  setAccountType,
  theme,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setAccountType(data.type)}
      style={styles.accountMap}
    >
      <View
        style={[
          styles.accountMap,
          {
            borderColor: data.type === accountType ? "#269355" : "#a1a1a1",
            backgroundColor:
              data.type === accountType
                ? "#2693550D"
                : theme === "dark"
                ? "#1a1a1a"
                : "#E9E9E9",
          },
        ]}
      >
        {data.icon}
        <View style={{ flex: 1 }}>
          <ThemedText
            darkColor="#d0d0d0"
            lightColor="#414141"
            style={{
              fontSize: 17,
              lineHeight: 20,
              fontWeight: 600,
              // color: "#414141",
            }}
          >
            {data.title}
          </ThemedText>
          <ThemedText
            darkColor="#a1a1a1"
            lightColor="#7F7F7F"
            style={{
              fontSize: 14,
              lineHeight: 20,
              // color: "#7F7F7F",
              marginTop: 4,
            }}
          >
            {data.desc}
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {},
  accountMap: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    // borderColor: "#E9E9E9",
    // backgroundColor: "#2693550D",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "flex-start",
  },
  icon: {
    backgroundColor: "#26935517",
    height: "auto",
    padding: 8,
    borderRadius: 50,
  },
});
