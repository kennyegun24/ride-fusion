import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/home/header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import Filters from "@/components/home/Filters";
import NewlyListedCard from "@/components/home/NewlyListedCard";
import { cars } from "@/utils/cars";

const index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ paddingHorizontal: 12, backgroundColor: "#fff", flex: 1 }}
      >
        <Header />
        <Searchbar
          value=""
          placeholder="Search cars"
          style={{
            backgroundColor: "#171C2208",
            borderColor: "#E9E9E9",
            borderWidth: 1,
            marginVertical: 12,
          }}
        />
        <Filters />
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewlyListedCard data={cars} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default index;

const styles = StyleSheet.create({});
