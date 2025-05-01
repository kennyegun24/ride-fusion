import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DynamicStarRating from "@/components/Stars";
import { number_formatter } from "@/utils/formatter.helper";
import { AntDesign } from "@expo/vector-icons";
import ModalComponent from "@/components/global/Modal";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import useAuth from "@/hooks/userAuth";
import { useRequest } from "@/providers/RequestProvider";

type props = {
  brand: string;
  model: number;
  rentalTerms: string;
};

const AdditionalFields = ({ brand, model, rentalTerms }: props) => {
  return (
    <View style={{ gap: 4, marginBottom: 8 }}>
      <Text style={[styles.locationText, { fontWeight: 500 }]}>
        Brand: <Text style={styles.locationText}>{brand}</Text>
      </Text>
      <Text style={[styles.locationText, { fontWeight: 500 }]}>
        Car Model: <Text style={styles.locationText}>{model}</Text>
      </Text>
      <Text style={[styles.locationText, { fontWeight: 500 }]}>
        Rental Terms: <Text style={styles.locationText}>{rentalTerms}</Text>
      </Text>
    </View>
  );
};

export default AdditionalFields;

type userProps = {
  reviewsLength: number;
  fullName: string;
  downloadURL: string;
  rating: number;
};

export const OwnerDetails = ({
  reviewsLength,
  fullName,
  downloadURL,
  rating,
}: userProps) => {
  return (
    <View style={styles.ownerImgContainer}>
      <Image source={{ uri: downloadURL }} style={styles.ownerImg} />
      <View>
        <Text style={styles.ownerName}>{fullName}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>{rating}</Text>
          <DynamicStarRating rating={rating || 0} size={16} />
          <Text style={styles.ratingNumber}>{reviewsLength} Reviews</Text>
        </View>
      </View>
    </View>
  );
};

type bottomProp = {
  rentalPricePerDay: number;
  userId: string;
  showChat: boolean;
};

export const BottomView = ({
  rentalPricePerDay,
  userId,
  showChat,
}: bottomProp) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { showToast } = useToast();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { triggerLoader } = useRequest();
  const { user } = useAuth();

  const sendRequest = async () => {
    try {
      triggerLoader(true);
      setModalVisible(false);
      const token = await user?.getIdToken();
      if (!token) return;
      const req = await axios.post(
        "http://172.20.10.3:4000/api/chat/request",
        {
          receiverId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⬅️ send token in headers
          },
        }
      );
      showToast({ text1: "Message request sent", toastType: "success" });
    } catch (error) {
      showToast({
        text1: "Request already sent or something went wrong",
        toastType: "error",
      });
    } finally {
      triggerLoader(false);
    }
  };

  return (
    <View style={styles.bottomButtonsContainer}>
      <ModalComponent
        closeModal={toggleModal}
        isModalVisible={isModalVisible}
        title="Are you sure you want to make message request with this person"
        rightButtonText="Yes"
        rightClick={sendRequest}
      />
      <Text style={{ fontSize: 17, fontWeight: 600 }}>
        ${number_formatter(rentalPricePerDay)}
      </Text>
      {showChat && (
        <Pressable onPress={toggleModal} style={styles.messageRender}>
          <AntDesign name="message1" size={16} color="#fff" />
          <Text style={styles.messageRenderText}>Message Render</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationText: { color: "#8B8B8B", fontSize: 14 },
  ownerImgContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 14,
  },
  ownerImg: { width: 40, height: 40, borderRadius: 50 },
  ownerName: { fontWeight: 600, fontSize: 16, color: "#414141" },
  ratingContainer: { flexDirection: "row", gap: 4 },
  ratingNumber: { color: "#6D6D6D", fontSize: 13 },
  bottomButtonsContainer: {
    backgroundColor: "#fff",
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
