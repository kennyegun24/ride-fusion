import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RelativePathString, router } from "expo-router";
import { useChat } from "@/providers/AllChatsProvider";
import { FlashList } from "@shopify/flash-list";
import { ThemedText } from "@/components/ThemedText";
import { chatTime } from "@/helper/chat_time";

const Chats = () => {
  const { chats } = useChat();

  const chatArray = Object.entries(chats ?? {});

  return (
    <FlashList
      data={chatArray}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => <ChatItem item={item} />}
      estimatedItemSize={80}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    />
  );
};

export default Chats;

type ChatItemProps = {
  item: [string, any]; // Tuple: [chatId, chatData]
};

const ChatItem: React.FC<ChatItemProps> = ({ item }) => {
  const [chatId, chatData] = item;

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: `/(protected)/chats/${chatId}` as RelativePathString,
          params: {
            details: JSON.stringify({
              ...chatData.userInfo,
            }),
          },
        })
      }
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent",
        },
      ]}
    >
      <View style={styles.chatCardContainer}>
        <View style={{ paddingVertical: 8 }}>
          <Image
            source={{ uri: chatData.userInfo.downloadURL }}
            style={styles.chatImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.chatName}>
            {chatData?.userInfo.displayName}
          </ThemedText>
          <ThemedText
            darkColor="#b6b6b6"
            lightColor="#505256"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.chatText}
          >
            {chatData?.lastMessage?.text}
          </ThemedText>
        </View>
        <ThemedText
          darkColor="#b6b6b6"
          lightColor="#505256"
          style={styles.chatTime}
        >
          {chatTime(chatData?.date)}
        </ThemedText>
        {chatData?.unreadCount ? (
          <Text style={styles.unreadCount}>{chatData.unreadCount}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollView: { paddingVertical: 12 },
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

  chatName: { fontSize: 16, fontWeight: "600", lineHeight: 20 },
  chatText: { fontSize: 12, maxWidth: "85%", lineHeight: 20 },
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
