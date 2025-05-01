import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Modal from "react-native-modal";

interface modalProps {
  isModalVisible: boolean;
  title: string;
  closeModal: () => void;
  rightButtonText: string;
  rightClick: () => void;
  leftClick?: () => void;
}
const ModalComponent: FC<modalProps> = ({
  closeModal,
  isModalVisible,
  rightButtonText,
  rightClick,
  title,
  leftClick,
}) => {
  return (
    <Modal isVisible={isModalVisible} style={{ height: 300, zIndex: 9 }}>
      <View
        style={{
          minHeight: 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            width: "70%",
            fontWeight: 600,
          }}
        >
          {title}
        </Text>

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
              No
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
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({});
