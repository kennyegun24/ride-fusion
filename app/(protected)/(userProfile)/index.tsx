import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { HeaderImage } from "@/components/profile/ProfileHeadet";
import PersonalInfoForm from "@/components/userProfile/PersonalInfoForm";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Page = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <HeaderImage minHeight={10} />
        <View style={styles.formContainer}>
          <PersonalInfoForm />
        </View>
      </ScrollView>
      <View style={styles.pressableView}>
        <Pressable style={styles.btnPressable}>
          <Text style={styles.btnText}>Update Profile</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    top: 48,
    padding: 6,
    borderRadius: 50,
  },
  scrollView: {
    paddingTop: 8,
    paddingHorizontal: 12,
    // backgroundColor: "red",
  },
  formContainer: {
    marginTop: 24,
  },
  pressableView: {
    paddingVertical: 12,
  },
  btnPressable: {
    backgroundColor: "#269355",
    width: "90%",
    borderRadius: 50,
    padding: 18,
    marginHorizontal: "auto",
  },
  btnText: {
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
  },
});
