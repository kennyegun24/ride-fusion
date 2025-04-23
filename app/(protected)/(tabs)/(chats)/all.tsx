import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { chats } from "@/utils/chats";

const Chats = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.chatContainer}>
        {chats.map((e, i) => (
          <Pressable
            onPress={() => router.navigate("/(chats)/yuhjgitu")}
            key={i}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "transparent", // Dark overlay
              },
            ]}
          >
            <View style={styles.chatCardContainer}>
              <View style={{ paddingVertical: 8 }}>
                <Image source={e.image} style={styles.chatImage} />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.chatName}>{e.name}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.chatText}
                >
                  {e.message}
                </Text>
              </View>
              <Text style={styles.chatTime}>{e.time}</Text>
              {e.unreadCount && (
                <Text style={styles.unreadCount}>{e.unreadCount}</Text>
              )}
            </View>
          </Pressable>
        ))}
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
