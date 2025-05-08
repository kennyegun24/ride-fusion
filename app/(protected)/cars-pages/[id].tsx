import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
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
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const CarDetail = () => {
  const { id } = useLocalSearchParams();
  const { carDetails, loading } = useCarDetails(id as string);
  const { user } = useAuth();
  if (loading) return <CarDetailsLoader />;
  const car = carDetails.car;
  const reviews = carDetails.reviews;
  const ratings = carDetails.averageRating;
  const carOwner = carDetails?.car?.user;
  const hasMoreReviews = carDetails?.hasMoreReviews;
  const chatExist = carDetails.chatExist;
  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar style="auto" hidden={false} />
      <ParallaxScrollView
        bottom={0}
        headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
        headerImage={<Pager image={car.images ?? []} />}
      >
        <View style={{ paddingTop: 12 }}>
          <View style={styles.topContainer}>
            <ThemedText style={styles.carName}>
              {car.car_name} {car.model}
            </ThemedText>
            <Text style={styles.btnText}>Available Now</Text>
          </View>
          <View style={styles.location}>
            <Octicons name="location" size={16} color="#8B8B8B" />
            <ThemedText darkColor="#f4f4f4" style={styles.locationText}>
              Ikeja, Lagos
            </ThemedText>
          </View>

          <AdditionalFields
            brand={car.brand}
            model={car.model}
            rentalTerms={car.rentalTerms}
          />
          <ThemedText darkColor="#f4f4f4" style={styles.descText}>
            {car.description}
          </ThemedText>
          <CaFeatures details={car.features || {}} />
          <OwnerDetails
            downloadURL={carOwner.downloadURL}
            fullName={carOwner.fullName}
            rating={ratings}
            uid={carOwner.uid}
            reviewsLength={reviews?.length}
          />
          <View style={styles.usersRatingsContainer}>
            {reviews?.length <= 0 ? (
              <NoReview />
            ) : (
              <View>
                {reviews?.map((e, _) => (
                  <Review key={_} data={e} />
                ))}
                {hasMoreReviews && (
                  <Pressable
                    style={{ padding: 6 }}
                    onPress={() =>
                      router.navigate({
                        pathname: "/(protected)/allReviews",
                        params: {
                          id: id,
                          type: "car",
                        },
                      })
                    }
                  >
                    <ThemedText
                      darkColor="#f4f4f4"
                      style={{ textAlign: "center" }}
                    >
                      See more reviews
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      </ParallaxScrollView>
      {!chatExist && user?.uid !== carOwner.uid && (
        <BottomView
          showRight={user?.uid !== carOwner.uid}
          userId={carOwner._id}
          rentalPricePerDay={car.rentalPricePerDay}
        />
      )}
    </ThemedView>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carName: { fontSize: 18, fontWeight: 600 },
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
  locationText: { fontSize: 14 },
  descText: { fontSize: 14, lineHeight: 24 },
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

// const Page = () => {
//   return (
//     <View>
//       <Text>
//         This is lorem Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         Nemo rerum sapiente non! Deserunt dolorem vel voluptates et suscipit,
//         reprehenderit quasi dignissimos eos optio pariatur, atque itaque enim
//         voluptatem excepturi ullam!
//       </Text>
//     </View>
//   );
// };

// export default Page;
