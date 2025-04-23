import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface props {
  first_text: string;
  second_text: string;
  onPressFirst?: () => void;
  onPressSecond?: () => void;
}

const TwinButtons = ({
  first_text,
  second_text,
  onPressFirst,
  onPressSecond,
}: props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPressFirst} style={styles.button}>
        <Text style={styles.btnText}>{first_text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSecond}
        style={[styles.button, styles.button2]}
      >
        <Text style={[styles.btnText, styles.btnText2]}>{second_text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwinButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 16,
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    padding: 12,
    borderRadius: 50,
    borderColor: "#269355",
    borderWidth: 1,
    color: "#269355",
  },
  button2: {
    backgroundColor: "#269355",
  },
  btnText: {
    textAlign: "center",
    color: "#269355",
  },
  btnText2: {
    color: "#fff",
  },
});
