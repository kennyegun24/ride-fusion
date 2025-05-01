import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
type PageSelectedEvent = {
  position: number;
};

interface PagerProps {
  image: string[];
}

const Pager: FC<PagerProps> = ({ image }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { top } = useSafeAreaInsets();
  const onPageMove = (e: NativeSyntheticEvent<PageSelectedEvent>) => {
    const pageInd = e.nativeEvent.position;
    setCurrentPage(pageInd);
  };
  return (
    <View>
      <PagerView
        style={styles.pageView}
        initialPage={0}
        onPageSelected={onPageMove}
      >
        {image.map((e, _) => (
          <View style={styles.page} key={_} collapsable={false}>
            <Image style={styles.image} source={{ uri: e }} />
          </View>
        ))}
      </PagerView>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => router.back()}
        style={[styles.backIcon, { top: top }]}
      >
        <MaterialIcons name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={[styles.countContainer, { top }]}>
        <Text>
          {currentPage + 1} of {image.length}
        </Text>
      </View>
    </View>
  );
};

export default Pager;

const styles = StyleSheet.create({
  pageView: {
    height: 300,
    width: "100%",
  },
  page: {
    flex: 1,
    backgroundColor: "green",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    backgroundColor: "gray",
    width: "100%",
    objectFit: "cover",
  },
  backIcon: {
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    height: 36,
    width: 36,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "#fff",
    position: "absolute",
    right: 20,
    borderRadius: 16,
  },
});
