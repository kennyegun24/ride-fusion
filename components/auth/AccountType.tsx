import { FC } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

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
}

export const AccountType: FC<accountTypeProps> = ({
  accountType,
  data,
  setAccountType,
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
            borderColor: data.type === accountType ? "#269355" : "#E9E9E9",
            backgroundColor:
              data.type === accountType ? "#2693550D" : "#E9E9E9",
          },
        ]}
      >
        {data.icon}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 600, color: "#414141" }}>
            {data.title}
          </Text>
          <Text style={{ fontSize: 16, color: "#7F7F7F", marginTop: 4 }}>
            {data.desc}
          </Text>
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
