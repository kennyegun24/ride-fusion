import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxHeaderScrollView from "@/components/ParallaxHeaderScrollView";
import { Header, HeaderImage } from "@/components/chats/ChatHeader";
import ChatText from "@/components/chats/ChatText";
import { formatChatDate, normalizeDate } from "@/helper/chat_time";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import ChatInput from "@/components/chats/ChatInput";
import useAuth from "@/hooks/userAuth";

// Define the message type
export interface Message {
  id: string;
  date: Timestamp;
  senderId: string;
  text: string;
}

const MESSAGES_PER_PAGE = 20;

const ChatScreen = () => {
  const { id, details } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const parseDetails = JSON.parse(details as string);
  const { user } = useAuth();

  // Ensure parseDetails has the expected structure
  interface ChatDetails {
    uid: string;
    [key: string]: any;
  }

  const chatDetails = parseDetails as ChatDetails;

  // Initial fetch and real-time updates for new messages
  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const chatsQuery = query(
      collection(db, "chats", id, "messages"),
      orderBy("date", "desc"),
      limit(MESSAGES_PER_PAGE)
    );

    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          date: data.date as Timestamp,
          senderId: data.senderId,
          text: data.text,
        });
      });

      // Sort messages to ensure newest at bottom
      newMessages.sort((a, b) => a.date.toMillis() - b.date.toMillis());
      setMessages(newMessages);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === MESSAGES_PER_PAGE);
    });

    return () => unsubscribe();
  }, [id]);

  // Load more messages
  const loadMoreMessages = async () => {
    if (!id || Array.isArray(id) || isLoading || !hasMore || !lastVisible)
      return;

    setIsLoading(true);
    try {
      const chatsQuery = query(
        collection(db, "chats", id, "messages"),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(MESSAGES_PER_PAGE)
      );

      const snapshot = await new Promise((resolve) => {
        const unsubscribe = onSnapshot(chatsQuery, (snap) => {
          resolve(snap);
          unsubscribe();
        });
      });

      const newMessages: Message[] = [];
      (snapshot as any).forEach((doc: any) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          date: data.date as Timestamp,
          senderId: data.senderId,
          text: data.text,
        });
      });

      newMessages.sort((a, b) => a.date.toMillis() - b.date.toMillis());
      setMessages((prev) => [...newMessages, ...prev]);
      setLastVisible(
        (snapshot as any).docs[(snapshot as any).docs.length - 1] || null
      );
      setHasMore((snapshot as any).docs.length === MESSAGES_PER_PAGE);
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // // Handle scroll to detect when user reaches the top
  // const handleScroll = (event: any) => {
  //   const { contentOffset } = event.nativeEvent;
  //   if (contentOffset.y <= 50 && !isLoading && hasMore) {
  //     loadMoreMessages();
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <View style={styles.scrollArea}>
          <ParallaxHeaderScrollView
            headerImage={<HeaderImage {...chatDetails} />}
            bottom={80}
            headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
            header={<Header {...chatDetails} />}
          >
            {hasMore && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMoreMessages}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#888" />
                ) : (
                  <Text style={styles.loadMoreText}>Load More</Text>
                )}
              </TouchableOpacity>
            )}
            {messages.length < 1 ? (
              <View style={{ height: 400 }}>
                <Text style={{ margin: "auto", color: "#888" }}>
                  No chat history
                </Text>
              </View>
            ) : (
              messages.map((e, i) => {
                const normalizedDate = normalizeDate(e.date);
                const currentDate = normalizedDate.toDateString();
                const prevDate =
                  i > 0
                    ? normalizeDate(messages[i - 1].date).toDateString()
                    : null;

                const isNewDay = currentDate !== prevDate;
                return (
                  <React.Fragment key={e.id}>
                    {isNewDay && (
                      <View
                        style={{ alignItems: "center", marginVertical: 10 }}
                      >
                        <Text style={{ color: "#888", fontSize: 12 }}>
                          {formatChatDate(normalizedDate)}
                        </Text>
                      </View>
                    )}
                    <ChatText myId={user?.uid} {...e} />
                  </React.Fragment>
                );
              })
            )}
          </ParallaxHeaderScrollView>
        </View>
        <ChatInput receiverUid={chatDetails.uid} chatId={id as string} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  loadMoreButton: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  loadMoreText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
