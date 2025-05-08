import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import ProfileScrollView from "@/components/ProfileScrollView";
import ProfileHeadet from "@/components/profile/ProfileHeadet";
import ProfileOverview from "@/components/profile/ProfileOverview";
import CarListings from "@/components/profile/CarListings";
import Review from "@/components/home/details/Review";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ProfileLoader from "@/components/global/ProfileLoader";
import { AllUsersProfileHeader } from "@/components/profile/AllProfileHeader";
import axios from "axios";
import useAuth from "@/hooks/userAuth";
import NoReview from "@/components/NoReview";
import BottomButtons from "@/components/global/BottomButtons";
import { sendChatRequest } from "@/helper/sendChatRequest";
import { useRequest } from "@/providers/RequestProvider";
import { useToast } from "@/providers/ToastProvider";
import { ThemedText } from "@/components/ThemedText";
import { API_ROUTE } from "@/utils/apiRoute";

type carUser = {
  user: { role: string; _id: string; uid: string; state: string; city: string };
  averageRating: number;
  totalReviews: number;
  latestReviews: any[];
  latestCars: any[];
  hasMoreCars: boolean;
  hasMoreReviews: boolean;
  chatExist: boolean;
};

const index = () => {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<carUser>({
    user: { role: "", _id: "", uid: "", state: "", city: "" },
    averageRating: 0.0,
    totalReviews: 0,
    latestReviews: [],
    latestCars: [],
    hasMoreCars: false,
    hasMoreReviews: false,
    chatExist: false,
  });
  const { user } = useAuth();

  const fetchUserDetails = async () => {
    setLoading(true);
    const token = await user?.getIdToken();
    try {
      const req = await axios.get(
        `${API_ROUTE}auth/details?userID=${params?.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await req.data;
      setUserDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserDetails();
    }, [])
  );

  const { triggerLoader } = useRequest();
  const { showToast } = useToast();

  const sendRequest = async () => {
    await sendChatRequest({
      triggerLoader,
      userId: userDetails?.user?._id,
      showToast,
      user,
    });
  };
  if (loading) return <ProfileLoader />;
  return (
    <View style={styles.container}>
      <ProfileScrollView
        bottom={0}
        header={<ProfileHeadet params={userDetails.user} />}
        headerBackgroundColor={{ light: "#fff", dark: "transparent" }}
        headerImage={<AllUsersProfileHeader params={userDetails.user} />}
      >
        <ProfileOverview
          ratings={userDetails.averageRating}
          reviews={userDetails.totalReviews}
          state={userDetails.user.state}
          city={userDetails.user.city}
        />
        {userDetails?.user?.role === "owner" && (
          <CarListings
            user={userDetails.user}
            cars={userDetails.latestCars}
            hasMore={userDetails.hasMoreCars}
          />
        )}
        {userDetails?.latestReviews.length > 0 ? (
          <View style={styles.usersRatingsContainer}>
            <ThemedText style={styles.reviewTitle}>
              Reviews({userDetails?.latestReviews?.length})
            </ThemedText>
            {userDetails?.latestReviews?.map((e, _) => (
              <Review key={_} data={e} />
            ))}
            {!userDetails.hasMoreReviews && (
              <Pressable
                onPress={() =>
                  router.navigate({
                    pathname: "/(protected)/allReviews",
                    params: {
                      id: userDetails?.user?._id,
                      type: "user",
                    },
                  })
                }
              >
                <ThemedText style={{ textAlign: "center" }}>
                  See more reviews
                </ThemedText>
              </Pressable>
            )}
          </View>
        ) : (
          <NoReview />
        )}
      </ProfileScrollView>
      {userDetails.user.uid !== user?.uid && !userDetails.chatExist && (
        <BottomButtons
          leftText="Review"
          showRight
          modalRightButtonText="Yes"
          modalRightClick={sendRequest}
          modalTitle="Are you sure you want to make message request with this person"
          leftClick={() => router.navigate("/(protected)/review")}
        />
      )}
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
