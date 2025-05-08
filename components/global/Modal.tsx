import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Modal from "react-native-modal";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface modalProps {
  isModalVisible: boolean;
  title: string;
  closeModal: () => void;
  rightButtonText: string;
  rightClick: () => void;
  leftButtonText: string;
  leftClick?: () => void;
}
const ModalComponent: FC<modalProps> = ({
  closeModal,
  isModalVisible,
  rightButtonText,
  rightClick,
  title,
  leftButtonText,
  leftClick,
}) => {
  return (
    <Modal isVisible={isModalVisible} style={{ height: 300, zIndex: 9 }}>
      <ThemedView
        style={{
          minHeight: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
            textAlign: "center",
            width: "70%",
            fontWeight: 600,
          }}
        >
          {title}
        </ThemedText>

        <View style={{ marginTop: 18, flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={leftClick ? leftClick : closeModal}
            style={{
              paddingVertical: 12,
              borderRadius: 50,
              backgroundColor: "#269355",
              width: "40%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {leftButtonText}
            </Text>
          </Pressable>
          <Pressable
            onPress={rightClick}
            style={{
              paddingVertical: 12,
              borderRadius: 50,
              backgroundColor: "#269355",
              width: "40%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {rightButtonText}
            </Text>
          </Pressable>
        </View>
      </ThemedView>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({});
