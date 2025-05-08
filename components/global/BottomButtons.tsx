import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";
import ModalComponent from "./Modal";
import { ThemedText } from "../ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { useToast } from "@/providers/ToastProvider";
import { number_formatter } from "@/utils/formatter.helper";

type bottomButtons = {
  leftText: string;
  modalRightClick: () => {};
  showRight: boolean;
  modalTitle: string;
  modalRightButtonText: string;
  leftClick?: () => void;
};

const BottomButtons = ({
  leftText,
  modalRightClick,
  showRight,
  modalTitle,
  modalRightButtonText,
  leftClick,
}: bottomButtons) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const rightRequest = async () => {
    await modalRightClick();
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.bottomButtonsContainer}>
      <ModalComponent
        closeModal={toggleModal}
        isModalVisible={isModalVisible}
        title={modalTitle}
        rightButtonText={modalRightButtonText}
        rightClick={rightRequest}
        leftButtonText="Cancel"
      />
      <Pressable onPress={leftClick ? leftClick : null}>
        <ThemedText
          darkColor="#f4f4f4"
          style={{ fontSize: 17, fontWeight: 600 }}
        >
          {leftText}
        </ThemedText>
      </Pressable>
      {showRight && (
        <Pressable onPress={toggleModal} style={styles.messageRender}>
          <AntDesign name="message1" size={16} color="#fff" />
          <Text style={styles.messageRenderText}>Message Render</Text>
        </Pressable>
      )}
    </ThemedView>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({
  bottomButtonsContainer: {
    // backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageRender: {
    padding: 12,
    backgroundColor: "#269355",
    borderRadius: 50,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  messageRenderText: { fontSize: 14, color: "#fff" },
});
