import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AntDesign, Octicons } from "@expo/vector-icons";
import Pager from "@/components/home/details/Pager";
import DynamicStarRating from "@/components/Stars";
import { cars } from "@/utils/cars";
import Review from "@/components/home/details/Review";
import CaFeatures from "@/components/home/details/CaFeatures";

const CarDetail = () => {
  const { id } = useLocalSearchParams();
  const findCar = cars.find((e) => e.car_name === id);
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        bottom={0}
        headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
        headerImage={<Pager image={findCar?.car_image ?? []} />}
      >
        <View style={{ paddingTop: 12 }}>
          <View style={styles.topContainer}>
            <Text style={styles.carName}>
              {id} {findCar?.car_year}
            </Text>
            <Text style={styles.btnText}>Available Now</Text>
          </View>
          <View style={styles.location}>
            <Octicons name="location" size={16} color="#8B8B8B" />
            <Text style={styles.locationText}>Ikeja, Lagos</Text>
          </View>
          <Text style={styles.descText}>{findCar?.description}</Text>
          <CaFeatures details={findCar?.details || []} />
          <View style={styles.ownerImgContainer}>
            <Image source={findCar?.owner_image} style={styles.ownerImg} />
            <View>
              <Text style={styles.ownerName}>{findCar?.owner_name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingNumber}>{findCar?.rating}</Text>
                <DynamicStarRating rating={findCar?.rating || 0} size={16} />
                <Text style={styles.ratingNumber}>
                  {findCar?.all_reviews?.length} Reviews
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.usersRatingsContainer}>
            {findCar?.all_reviews?.map((e, _) => (
              <Review key={_} data={e} />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
      <View style={styles.bottomButtonsContainer}>
        <Text style={{ fontSize: 24 }}>${findCar?.rent_amount}</Text>
        <Pressable style={styles.messageRender}>
          <AntDesign name="message1" size={16} color="#fff" />
          <Text style={styles.messageRenderText}>Message Render</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carName: { fontSize: 24, fontWeight: 600, color: "#414141" },
  btnText: {
    color: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#269355",
    backgroundColor: "#2693550D",
  },
  location: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginVertical: 12,
  },
  locationText: { color: "#8B8B8B", fontSize: 16 },
  descText: { color: "#8B8B8B", fontSize: 17, lineHeight: 26 },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "gray",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  ownerImgContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 14,
  },
  ownerImg: { width: 40, height: 40, borderRadius: 50 },
  ownerName: { fontWeight: 600, fontSize: 18, color: "#414141" },
  ratingContainer: { flexDirection: "row", gap: 4 },
  ratingNumber: { color: "#6D6D6D", fontSize: 16 },
  usersRatingsContainer: {
    marginVertical: 16,
    gap: 16,
  },
  bottomButtonsContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageRender: {
    padding: 12,
    backgroundColor: "#269355",
    borderRadius: 50,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  messageRenderText: { fontSize: 18, color: "#fff" },
});
