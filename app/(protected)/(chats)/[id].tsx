import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import ParallaxHeaderScrollView from "@/components/ParallaxHeaderScrollView";
import { Header, HeaderImage } from "@/components/chats/ChatHeader";
import { Entypo, Feather } from "@expo/vector-icons";
import { conversations } from "@/utils/chats";
import ChatText from "@/components/chats/ChatText";
import { formatChatDate } from "@/helper/chat_time";

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust as needed for header/nav
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.inner}>
        <View style={styles.scrollArea}>
          <ParallaxHeaderScrollView
            headerImage={<HeaderImage />}
            bottom={80} // leave some space for input bar
            headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
            header={<Header />}
          >
            {conversations.map((e, i) => {
              const currentDate = new Date(e.timeSent).toDateString();
              const prevDate =
                i > 0
                  ? new Date(conversations[i - 1].timeSent).toDateString()
                  : null;

              const isNewDay = currentDate !== prevDate;

              return (
                <React.Fragment key={i}>
                  {isNewDay && (
                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                      <Text style={{ color: "#888", fontSize: 12 }}>
                        {formatChatDate(new Date(e.timeSent))}
                      </Text>
                    </View>
                  )}
                  <ChatText data={e} />
                </React.Fragment>
              );
            })}
          </ParallaxHeaderScrollView>
        </View>

        <View style={styles.messageBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Entypo name="attachment" size={24} color="#269355" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message"
            keyboardType="default"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="send" size={24} color="#269355" />
          </TouchableOpacity>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
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
  dummyText: {
    height: 6000,
    padding: 12,
    backgroundColor: "red",
    flex: 1,
  },
  messageBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  iconButton: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#171C220D",
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBDBDB",
  },
  sendButton: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: "#269355",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2693551C",
  },
});
