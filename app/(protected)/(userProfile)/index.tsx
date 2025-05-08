import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { HeaderImage } from "@/components/profile/ProfileHeadet";
import PersonalInfoForm from "@/components/userProfile/PersonalInfoForm";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { updateUserProfile } from "@/helper/updateProfile";
import useAuth from "@/hooks/userAuth";
import { updateProfile } from "firebase/auth";
import { useRequest } from "@/providers/RequestProvider";
import { ThemedView } from "@/components/ThemedView";

const Page = () => {
  const [values, setValues] = useState({
    fullName: "",
    // email: "",
    phone: "",
  });
  const { user } = useAuth();
  const { triggerLoader } = useRequest();

  const saveUpdate = async () => {
    triggerLoader(true);
    try {
      if (user) {
        const idToken = await user?.getIdToken();

        if (values.fullName.length > 1) {
          await updateProfile(user, {
            displayName: values.fullName,
          });
        }
        await updateUserProfile({
          idToken,
          serverUrl: "auth/update",
          updateData: values,
          userId: user?.uid,
        });
      }
    } catch (error) {
    } finally {
      triggerLoader(false);
    }
  };
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather
              name="chevron-left"
              size={24}
              color={theme === "light" ? "#000" : "#fff"}
            />
          </Pressable>
          <HeaderImage minHeight={10} />
          <View style={styles.formContainer}>
            <PersonalInfoForm values={values} setValues={setValues} />
          </View>
        </ScrollView>
        <View style={styles.pressableView}>
          <Pressable onPress={saveUpdate} style={styles.btnPressable}>
            <Text style={styles.btnText}>Update Profile</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
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
