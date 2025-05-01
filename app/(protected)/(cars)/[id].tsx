import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Octicons } from "@expo/vector-icons";
import Pager from "@/components/home/details/Pager";
import Review from "@/components/home/details/Review";
import CaFeatures from "@/components/home/details/CaFeatures";
import { StatusBar } from "expo-status-bar";
import useCarDetails from "@/hooks/useFetchCarDetails";
import CarDetailsLoader from "@/components/global/CarDetailsLoader";
import NoReview from "@/components/NoReview";
import AdditionalFields, {
  BottomView,
  OwnerDetails,
} from "@/components/home/details/AdditionalFields";
import useAuth from "@/hooks/userAuth";

const CarDetail = () => {
  const { id } = useLocalSearchParams();
  const { carDetails, loading } = useCarDetails(id as string);
  const { user } = useAuth();
  if (loading) return <CarDetailsLoader />;
  const car = carDetails.car;
  const reviews = carDetails.reviews;
  const carOwner = carDetails?.car?.user;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" hidden={false} />
      <ParallaxScrollView
        bottom={0}
        headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
        headerImage={<Pager image={car.images ?? []} />}
      >
        <View style={{ paddingTop: 12 }}>
          <View style={styles.topContainer}>
            <Text style={styles.carName}>
              {car.car_name} {car.model}
            </Text>
            <Text style={styles.btnText}>Available Now</Text>
          </View>
          <View style={styles.location}>
            <Octicons name="location" size={16} color="#8B8B8B" />
            <Text style={styles.locationText}>Ikeja, Lagos</Text>
          </View>

          <AdditionalFields
            brand={car.brand}
            model={car.model}
            rentalTerms={car.rentalTerms}
          />
          <Text style={styles.descText}>{car.description}</Text>
          <CaFeatures details={car.features || {}} />
          <OwnerDetails
            downloadURL={carOwner.downloadURL}
            fullName={carOwner.fullName}
            rating={car.rating}
            reviewsLength={reviews?.length}
          />
          <View style={styles.usersRatingsContainer}>
            {reviews?.length <= 0 ? (
              <NoReview />
            ) : (
              reviews?.map((e, _) => <Review key={_} data={e} />)
            )}
          </View>
        </View>
      </ParallaxScrollView>
      <BottomView
        showChat={user?.uid !== carOwner.uid}
        userId={carOwner._id}
        rentalPricePerDay={car.rentalPricePerDay}
      />
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
  carName: { fontSize: 18, fontWeight: 600, color: "#414141" },
  btnText: {
    fontSize: 13,
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
  locationText: { color: "#8B8B8B", fontSize: 14 },
  descText: { color: "#8B8B8B", fontSize: 14, lineHeight: 24 },
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

  usersRatingsContainer: {
    marginVertical: 16,
    gap: 16,
  },
});
