import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { FC } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface HistoryCardProps {
  data: {
    carName: string;
    renterName: string;
    dateCompleted?: string;
    dateStarted?: string;
    dateRequested?: string;
    image: ImageSourcePropType;
  };
}

const HistoryCard: FC<HistoryCardProps> = ({ data }) => {
  return (
    <ThemedView
      darkColor="#2F2F2F"
      border_d_color="#E0E0E040"
      border_l_color="#e9e9e9"
      style={styles.cardContainer}
    >
      <View style={styles.imageTextContainer}>
        <Image style={styles.carImage} source={data.image} />
        <View style={""}>
          <ThemedText
            lightColor="#414141"
            darkColor="#fff"
            style={styles.carName}
          >
            {data.carName}
          </ThemedText>
          <ThemedText
            lightColor="#8B8B8B"
            darkColor="#a1a1a1"
            style={styles.renterName}
          >
            {data.renterName}
          </ThemedText>
          <ThemedText
            lightColor="#8B8B8B"
            darkColor="#a1a1a1"
            style={styles.renterName}
          >
            {data.dateCompleted || data.dateRequested || data.dateStarted}
          </ThemedText>
        </View>
      </View>
      <TouchableHighlight style={styles.enterChatButton}>
        <ThemedText lightColor="" darkColor="" style={styles.enterChatText}>
          Chat Renter
        </ThemedText>
      </TouchableHighlight>
    </ThemedView>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    alignItems: "flex-start",
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  carImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  imageTextContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  carName: {
    fontSize: 15,
    fontWeight: 600,
    // color: "#414141",
    lineHeight: 20,
  },
  renterName: {
    // color: "#8B8B8B",
    fontSize: 13,
    marginTop: 2,
    lineHeight: 20,
  },
  enterChatButton: {
    borderWidth: 1,
    borderColor: "#269355",
    backgroundColor: "#2693550D",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
  },
  enterChatText: {
    color: "#269355",
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 20,
  },
});
