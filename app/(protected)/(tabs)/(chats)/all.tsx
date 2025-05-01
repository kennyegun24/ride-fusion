import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RelativePathString, router } from "expo-router";
// import { chats } from "@/utils/chats";
import { useChat } from "@/providers/AllChatsProvider";

const Chats = () => {
  const { chats } = useChat();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.chatContainer}>
        {Object.entries(chats ?? {})?.map((e, i) => {
          return (
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: `/(protected)/chats/${e[0]}` as RelativePathString,
                  params: {
                    details: JSON.stringify({
                      ...e[1].userInfo,
                    }),
                  },
                })
              }
              key={e[0]}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent", // Dark overlay
                },
              ]}
            >
              <View style={styles.chatCardContainer}>
                <View style={{ paddingVertical: 8 }}>
                  <Image
                    source={{ uri: e[1].userInfo.downloadURL }}
                    style={styles.chatImage}
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.chatName}>
                    {e[1]?.userInfo.displayName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.chatText}
                  >
                    {e[1]?.lastMessage?.text}
                  </Text>
                </View>
                <Text style={styles.chatTime}>
                  {e[1]?.date?.toDate()?.toLocaleString()}
                </Text>
                {e[1]?.unreadCount && (
                  <Text style={styles.unreadCount}>{e[1].unreadCount}</Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  scrollView: { paddingVertical: 12, backgroundColor: "#fff" },
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
