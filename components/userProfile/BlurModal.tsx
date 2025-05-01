import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import BlurModal from "../BlurModal";

const { height, width } = Dimensions.get("screen");

interface props {
  action: string;
  closeModal: () => void;
  signOut: () => void;
}

const AccountActionsModal = ({ action, closeModal, signOut }: props) => {
  return (
    <BlurModal closeModal={closeModal}>
      {action === "signOut" ? (
        <>
          <Text style={styles.titleText}>Logging Out!</Text>
          <Text style={styles.descText}>Are you sure you want to logout?</Text>
          <View style={styles.btnContainer}>
            <Pressable
              style={[styles.authButton, styles.btnTransparent]}
              onPress={closeModal}
            >
              <Text style={[styles.authText, styles.textGreen]}>Cancel</Text>
            </Pressable>
            <Pressable onPress={signOut} style={[styles.authButton]}>
              <Text style={styles.authText}>Log Out</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.titleText}>Delete Account?</Text>
          <Text style={styles.descText}>
            Are you sure you want to delete your account?
          </Text>
          <View style={styles.btnContainer}>
            <Pressable style={[styles.authButton, styles.btnTransparent]}>
              <Text
                style={[styles.authText, styles.textGreen]}
                onPress={closeModal}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable style={[styles.authButton]}>
              <Text style={styles.authText}>Delete Account</Text>
            </Pressable>
          </View>
        </>
      )}
    </BlurModal>
  );
};

export default AccountActionsModal;

const styles = StyleSheet.create({
  titleText: {
    color: "#414141",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 4,
  },
  descText: {
    color: "#8B8B8B",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 48,
    marginHorizontal: "auto",
    width: "70%",
  },
  authButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
    width: "45%",
  },
  btnTransparent: {
    backgroundColor: "#fff",
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  authText: { textAlign: "center", color: "#fff", fontSize: 14 },
  textGreen: { color: "#FF0000" },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
