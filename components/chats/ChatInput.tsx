import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import useAuth from "@/hooks/userAuth";
import uuid from "react-native-uuid";
// import { v4 as uuidv4 } from "uuid";

type props = {
  receiverUid: string;
  chatId: string;
};

const ChatInput = ({ receiverUid, chatId }: props) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const handleSend = async () => {
    try {
      if (user?.uid) {
        const messageId = uuid.v4();
        if (text.trim() !== "") {
          await setDoc(doc(db, "chats", chatId, "messages", messageId), {
            id: messageId,
            text,
            senderId: user.uid,
            date: Timestamp.now(),
          });

          await updateDoc(doc(db, "userChat", user?.uid), {
            [chatId + ".lastMessage"]: {
              text,
            },
            [chatId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChat", receiverUid), {
            [chatId + ".lastMessage"]: {
              text,
            },
            [chatId + ".date"]: serverTimestamp(),
          });
          setText("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.messageBar}>
      <TouchableOpacity style={styles.iconButton}>
        <Entypo name="attachment" size={20} color="#269355" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Type your message"
        keyboardType="default"
        multiline
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Feather name="send" size={20} color="#269355" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
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
