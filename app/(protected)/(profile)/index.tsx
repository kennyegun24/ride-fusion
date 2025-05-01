import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ProfileScrollView from "@/components/ProfileScrollView";
import ProfileHeadet, { HeaderImage } from "@/components/profile/ProfileHeadet";
import ProfileOverview from "@/components/profile/ProfileOverview";
import CarListings from "@/components/profile/CarListings";
import Review from "@/components/home/details/Review";
import { cars } from "@/utils/cars";

const index = () => {
  return (
    <View style={styles.container}>
      <ProfileScrollView
        bottom={0}
        header={<ProfileHeadet />}
        headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
        headerImage={<HeaderImage />}
      >
        <ProfileOverview />
        <CarListings />
        {/* <Review data={cars[0].all_reviews} /> */}
        <View style={styles.usersRatingsContainer}>
          <Text style={styles.reviewTitle}>
            Reviews({cars[0].all_reviews?.length})
          </Text>
          {cars[0].all_reviews?.map((e, _) => (
            <Review key={_} data={e} />
          ))}
        </View>
      </ProfileScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.button2]}>
          <Text style={[styles.btnText, styles.btnText2]}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { flex: 1 },
  usersRatingsContainer: {
    marginBottom: 16,
    gap: 16,
  },
  reviewTitle: { fontSize: 17, fontWeight: 600 },
  buttonContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 16,
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    padding: 12,
    borderRadius: 50,
    borderColor: "#269355",
    borderWidth: 1,
    color: "#269355",
  },
  button2: {
    backgroundColor: "#269355",
  },
  btnText: {
    textAlign: "center",
    color: "#269355",
  },
  btnText2: {
    color: "#fff",
  },
});
