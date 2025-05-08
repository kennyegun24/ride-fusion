import { Chat, defaultTheme, MessageType } from "@flyerhq/react-native-chat-ui";
import { useState, useLayoutEffect, useRef } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Header } from "@/components/chats/ChatHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  handleSendMessage,
  loadInitialMessages,
  onPaginate,
  realTimeListener,
} from "@/helper/loadInitialMessages";
import { messageProps, RenderBubble } from "@/components/chats/bubble";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

const DEFAULT_HEADER_HEIGHT = 80;
interface ChatDetails {
  uid: string;
  [key: string]: any;
}

const onHeaderLayout = (event: any, setHeaderHeight: any) => {
  const { height } = event.nativeEvent.layout;
  setHeaderHeight(height);
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<MessageType.Any[]>([]);
  const currentUser = getAuth().currentUser;
  const user = { id: (currentUser?.uid as string) || "" };
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
  const lastLoadedMessageIds = useRef<Set<string>>(new Set());
  const { id, details } = useLocalSearchParams();
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_HEADER_HEIGHT);
  const theme = useColorScheme();

  const handleSendPress = async (message: MessageType.PartialText) => {
    const token = await currentUser?.getIdToken();
    handleSendMessage({
      message: message,
      currentUser,
      id: id as string,
      chatDetails,
      token: token,
    });
  };
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const parseDetails = JSON.parse(details as string);

  const chatDetails = parseDetails as ChatDetails;

  useLayoutEffect(() => {
    loadInitialMessages(
      id as string,
      setMessages as React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
      setLastDoc as React.Dispatch<
        React.SetStateAction<QueryDocumentSnapshot<DocumentData>>
      >,
      lastLoadedMessageIds.current
    );

    const unsubscribe = realTimeListener(
      id as string,
      setMessages as React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
      lastLoadedMessageIds.current
    );
    return () => unsubscribe();
  }, []);
  const onMoreMessages = async () => {
    onPaginate(
      id as string,
      loadingMore,
      lastDoc as QueryDocumentSnapshot<DocumentData>,
      setLoadingMore,
      setMessages as React.Dispatch<React.SetStateAction<MessageType.Text[]>>,
      setLastDoc,
      lastLoadedMessageIds.current
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: "dark",
          headerStyle: { backgroundColor: "transparent" },
          header: () => (
            <View
              onLayout={(e) => onHeaderLayout(e, setHeaderHeight)}
              style={[styles.stackHeader]}
            >
              <Header theme={theme} {...chatDetails} />
            </View>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : undefined}
      >
        <ThemedView style={{ flex: 1 }} lightColor="#fff" darkColor="#282828">
          <Chat
            theme={{
              ...defaultTheme,
              colors: {
                ...defaultTheme.colors,
                background: "inherit",
                inputBackground: theme === "dark" ? "#fff" : "#282828",
                inputText: theme === "dark" ? "#282828" : "#fff",
                primary: "#282828",
              },
            }}
            renderBubble={(e) => (
              <RenderBubble
                user={user}
                message={e.message as messageProps}
                nextMessageInGroup={e.nextMessageInGroup}
              />
            )}
            messages={messages}
            onSendPress={handleSendPress}
            user={user}
            onEndReached={onMoreMessages}
            inputProps={{}}
            textInputProps={{
              placeholderTextColor: theme === "dark" ? "#818181" : "#a1a1a1",
            }}
            flatListProps={{
              contentOffset: { y: -headerHeight, x: 0 },
              contentInset: { bottom: headerHeight },
              ListFooterComponent:
                Platform.OS === "android" ? (
                  <View
                    style={{
                      height: headerHeight,
                    }}
                  />
                ) : null,
            }}
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  stackHeader: {
    // paddingBottom: 12,
  },
});
