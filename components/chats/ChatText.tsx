import { StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import { chatTime } from "@/helper/chat_time";

interface ConversationProps {
  data: {
    senderId: string;
    receiverId: string;
    message: string;
    timeSent: Date;
  };
}
const ChatText: FC<ConversationProps> = ({ data }) => {
  const isReceiver = data.receiverId === "user1";
  const style = useMemo(() => styles(isReceiver), [isReceiver]);
  return (
    <View style={style.container}>
      <View style={{ width: "75%" }}>
        <Text style={style.textMessage}>{data.message}</Text>
        <Text style={style.timeStamp}>{chatTime(data.timeSent)}</Text>
      </View>
    </View>
  );
};

export default ChatText;

const styles = (isReceiver: boolean) => {
  return StyleSheet.create({
    container: { flexDirection: isReceiver ? "row-reverse" : "row" },
    textMessage: {
      fontSize: 14,
      maxWidth: "100%",
      backgroundColor: isReceiver ? "#269355" : "#171C220D",
      color: isReceiver ? "#fff" : "#454545",
      padding: 12,
      // borderStartStartRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      // borderStartEndRadius: 12,
      borderBottomLeftRadius: isReceiver ? 12 : 0,
      borderBottomRightRadius: isReceiver ? 0 : 12,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      lineHeight: 22,
    },
    timeStamp: {
      fontSize: 12,
      color: "#A09C9C",
      textAlign: isReceiver ? "right" : "left",
      marginTop: 4,
    },
  });
};
