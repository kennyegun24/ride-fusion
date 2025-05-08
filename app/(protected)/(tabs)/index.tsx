import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Header from "@/components/home/header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import Filters from "@/components/home/Filters";
import NewlyListedCard from "@/components/home/NewlyListedCard";
// import { cars } from "@/utils/cars";
import useNewNearCars from "@/hooks/useNewNearCars";
import TopRatedCars from "@/components/home/TopRatedCars";
import { FlashList } from "@shopify/flash-list";
import { CarObjProps } from "@/types/carTypes";
import Car from "@/components/home/Car";
import useRecommendedCars from "@/hooks/useRecommendedCars";
import debounce from "lodash/debounce";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchLoader from "@/components/search/SearchLoader";
import { ItemLoader } from "@/components/home/itemLoader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import SearchBar from "@/components/search/SearchBar";

type CarProps = {
  data: CarObjProps[];
};

const index = () => {
  const { cars, loading, refresh } = useNewNearCars();
  const [searchValue, setSearchValue] = useState("");
  const theme = useColorScheme();

  const {
    cars: recommendedCars,
    hasMore,
    loadMore,
    refreshRecommended,
    recommendedLoading,
  } = useRecommendedCars();

  const handleRefresh = async () => {
    refresh();
    refreshRecommended();
  };

  const handleLoadMore = useCallback(
    debounce(() => {
      if (hasMore) {
        loadMore();
      }
    }, 300),
    [hasMore, loadMore]
  );

  return (
    <SafeAreaProvider>
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 12 }}>
            <Header />
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              press
            />
          </View>
          <Filters />
          <View style={{ flex: 1 }}>
            <FlashList
              ListHeaderComponent={
                <View
                  style={{
                    minHeight: 400,
                    paddingHorizontal: 12,
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <TopRatedCars loading={loading} data={cars.nearCars} />
                  <NewlyListedCard loading={loading} data={cars.newCars} />
                  <ThemedText style={[styles.title, { paddingTop: 24 }]}>
                    Recommended Cars
                  </ThemedText>
                </View>
              }
              onRefresh={handleRefresh}
              refreshing={loading}
              data={recommendedCars as CarObjProps[]}
              keyExtractor={(item) => item._id as string}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexGrow: 1,
                    paddingLeft: index % 4 === 0 ? 6 : index % 2 === 0 ? 6 : 0,
                    paddingRight: index % 1 === 0 ? 6 : 0,
                    paddingBottom: index % 1 === 0 ? 6 : 0,
                  }}
                >
                  <Car
                    {...item}
                    downloadURL={item.user?.downloadURL}
                    fullName={item.user?.fullName}
                  />
                </View>
              )}
              ListEmptyComponent={
                recommendedLoading ? <ItemLoader no={6} /> : null
              }
              showsVerticalScrollIndicator={false}
              numColumns={2}
              onEndReached={handleLoadMore} // ✅ Debounced loadMore
              onEndReachedThreshold={0.1}
              contentContainerStyle={{}}
              estimatedItemSize={250}
            />
          </View>
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
};

export default index;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 500,
    marginBottom: 12,
  },
});
