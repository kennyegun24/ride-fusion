import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { HeaderImage } from "@/components/profile/ProfileHeadet";
import ProfileOptions from "@/components/userProfile/ProfileOptions";
import AccountActionsModal from "@/components/userProfile/BlurModal";
import { getAuth } from "firebase/auth";
import { useRegistrationState } from "@/hooks/useRegisterationState";
import { ThemedView } from "@/components/ThemedView";

const profile = () => {
  const [action, setAction] = useState<string>("");
  const hideModal = () => setAction("");
  const signOut = async () => {
    await getAuth().signOut();
    useRegistrationState.getState().setRegistrationComplete(false);
  };
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <HeaderImage minHeight={10} />
          <View style={styles.profileOptions}>
            <ProfileOptions setAction={setAction} theme={theme} />
          </View>
        </ScrollView>
        {action.trim() !== "" && (
          <AccountActionsModal
            signOut={signOut}
            action={action}
            closeModal={hideModal}
            theme={theme}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

export default profile;

const styles = StyleSheet.create({
  profileOptions: { marginVertical: 24 },
});
