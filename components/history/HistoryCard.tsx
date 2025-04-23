import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { FC } from "react";

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
    <View style={styles.cardContainer}>
      <View style={styles.imageTextContainer}>
        <Image style={styles.carImage} source={data.image} />
        <View style={""}>
          <Text style={styles.carName}>{data.carName}</Text>
          <Text style={styles.renterName}>{data.renterName}</Text>
          <Text style={styles.renterName}>
            {data.dateCompleted || data.dateRequested || data.dateStarted}
          </Text>
        </View>
      </View>
      <TouchableHighlight style={styles.enterChatButton}>
        <Text style={styles.enterChatText}>Chat Renter</Text>
      </TouchableHighlight>
    </View>
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
    backgroundColor: "#171C2208",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
  carImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  imageTextContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  carName: {
    fontSize: 18,
    fontWeight: 600,
    color: "#414141",
  },
  renterName: {
    color: "#8B8B8B",
    fontSize: 14,
    marginTop: 2,
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
  },
});
