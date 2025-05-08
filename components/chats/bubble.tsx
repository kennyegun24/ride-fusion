import { chatTime } from "@/helper/chat_time";
import { Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export type messageProps = {
  author: {
    id: string;
  };
  text: string;
  createdAt: number;
};

export const RenderBubble = ({
  message,
  nextMessageInGroup,
  user,
}: {
  message: messageProps;
  nextMessageInGroup: boolean;
  user: { id: string };
}) => {
  return (
    <View>
      <ThemedView
        darkColor={user.id !== message.author.id ? "#282828" : "#fff"}
        lightColor={user.id !== message.author.id ? "#fff" : "#282828"}
        border_d_color={user.id !== message.author.id ? "#bdbdbd" : "#282828"}
        border_l_color={user.id !== message.author.id ? "#282828" : "#fff"}
        style={{
          borderBottomLeftRadius:
            !nextMessageInGroup && user.id !== message.author.id ? 12 : 6,
          borderBottomRightRadius:
            !nextMessageInGroup && user.id === message.author.id ? 12 : 6,
          // borderColor: "#1d1c21",
          borderWidth: 1,
          overflow: "hidden",
          maxWidth: "100%",
          paddingHorizontal: 10,
        }}
      >
        <ThemedText
          darkColor={user.id !== message.author.id ? "#fff" : "#1d1c21"}
          lightColor={user.id !== message.author.id ? "#1d1c21" : "#fff"}
          style={{
            padding: 8,
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          {message?.text.trim()}
        </ThemedText>
      </ThemedView>
      <ThemedText
        style={{
          fontSize: 10,
          marginLeft: user.id === message.author.id ? "auto" : 0,
          fontWeight: 600,
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        {chatTime(message.createdAt)}
      </ThemedText>
    </View>
  );
};
