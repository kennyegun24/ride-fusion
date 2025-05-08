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
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import BottomButtons from "@/components/global/BottomButtons";
import { sendChatRequest } from "@/helper/sendChatRequest";

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
  uid: string;
};

export const OwnerDetails = ({
  reviewsLength,
  fullName,
  downloadURL,
  rating,
  uid,
}: userProps) => {
  return (
    <Pressable
      onPress={() =>
        router.navigate({ pathname: "/(protected)/(profile)", params: { uid } })
      }
      style={styles.ownerImgContainer}
    >
      <Image source={{ uri: downloadURL }} style={styles.ownerImg} />
      <View>
        <ThemedText style={styles.ownerName}>{fullName}</ThemedText>
        <View style={styles.ratingContainer}>
          <ThemedText darkColor="#f2f2f2" style={styles.ratingNumber}>
            {rating}
          </ThemedText>
          <DynamicStarRating rating={rating || 0} size={16} />
          <ThemedText darkColor="#f2f2f2" style={styles.ratingNumber}>
            {reviewsLength} Reviews
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

type bottomProp = {
  rentalPricePerDay: number;
  userId: string;
  showRight: boolean;
};

export const BottomView = ({
  rentalPricePerDay,
  userId,
  showRight,
}: bottomProp) => {
  const { showToast } = useToast();

  const { triggerLoader } = useRequest();
  const { user } = useAuth();

  const sendRequest = async () => {
    await sendChatRequest({ triggerLoader, userId, showToast, user });
  };

  return (
    // <ThemedView style={styles.bottomButtonsContainer}>
    //   <ModalComponent
    //     closeModal={toggleModal}
    //     isModalVisible={isModalVisible}
    //     title="Are you sure you want to make message request with this person"
    //     rightButtonText="Yes"
    //     rightClick={sendRequest}
    //   />
    //   <ThemedText darkColor="#f4f4f4" style={{ fontSize: 17, fontWeight: 600 }}>

    //   </ThemedText>
    //   {showRight && (
    //     <Pressable onPress={toggleModal} style={styles.messageRender}>
    //       <AntDesign name="message1" size={16} color="#fff" />
    //       <Text style={styles.messageRenderText}>Message Render</Text>
    //     </Pressable>
    //   )}
    // </ThemedView>
    <BottomButtons
      leftText={number_formatter(rentalPricePerDay)}
      modalRightClick={sendRequest}
      showRight={showRight}
      modalTitle="Are you sure you want to make message request with this person"
      modalRightButtonText="Yes"
    />
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
  ownerName: { fontWeight: 600, fontSize: 16 },
  ratingContainer: { flexDirection: "row", gap: 4 },
  ratingNumber: { fontSize: 13 },
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
