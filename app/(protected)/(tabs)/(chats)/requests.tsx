import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import useAuth from "@/hooks/userAuth";
import { ScrollView } from "moti";
import ModalComponent from "@/components/global/Modal";
import { ThemedView } from "@/components/ThemedView";
import { API_ROUTE } from "@/utils/apiRoute";

type requestProps = {
  sender: {
    downloadURL: string;
    fullName: string;
    _id: string;
  };
  _id: string;
  receiver: string;
  senderUID: string;
  receiverUID: string;
};

const Requests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<requestProps[]>([]);
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const makeRequest = async () => {
        const token = await user?.getIdToken();
        try {
          const req = await axios.get(`${API_ROUTE}chat/all-requests`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRequests(req.data?.requests);
        } catch (error) {
          console.log(error);
        }
      };

      makeRequest();
    }, [])
  );

  const acceptRequest = async (e: string) => {
    try {
      const token = await user?.getIdToken();
      const req = await axios.post(
        `${API_ROUTE}chat/accept-request`,
        { requestId: e },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalVisible(false);
    } catch (error) {}
  };

  const rejectRequest = async () => {
    try {
      setIsModalVisible(false);
    } catch (error) {}
  };

  // console.log(JSON.stringify(requests, null, 2));
  return (
    <ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.chatContainer}>
          {requests.map((e, i) => (
            <Pressable
              onPress={() => setIsModalVisible(true)}
              key={i}
              style={{ backgroundColor: "transparent" }}
            >
              <ModalComponent
                isModalVisible={isModalVisible}
                title="Accept user request?"
                rightButtonText="Accept"
                rightClick={() => acceptRequest(e._id)}
                closeModal={() => setIsModalVisible(false)}
                leftClick={rejectRequest}
                leftButtonText="Cancel"
              />

              <View style={styles.chatCardContainer}>
                <View style={{ paddingVertical: 8 }}>
                  <Image
                    source={{ uri: e.sender.downloadURL }}
                    style={styles.chatImage}
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.chatName}>{e.sender.fullName}</Text>
                  <Text style={styles.chatText}>Message request</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Requests;

const styles = StyleSheet.create({
  scrollView: { paddingVertical: 12 },
  chatContainer: {},
  chatCardContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    paddingHorizontal: 4,
    width: "100%",
  },
  detailsContainer: {
    gap: 2,
    flex: 1,
    height: "100%",
    paddingTop: 10,
    borderBottomColor: "#D0D5DDB2",
    borderBottomWidth: 1,
  },
  chatImage: { height: 55, width: 55, borderRadius: 50 },

  chatName: { fontSize: 16, fontWeight: 600, color: "#505256" },
  chatText: { color: "#505256", fontSize: 12, maxWidth: "85%" },
  chatTime: { position: "absolute", top: 10, right: 10, fontSize: 12 },
  unreadCount: {
    position: "absolute",
    bottom: 5,
    right: 10,
    fontSize: 10,
    backgroundColor: "#269355",
    paddingHorizontal: 12,
    color: "#fff",
    paddingVertical: 2,
    borderRadius: 50,
  },
});
