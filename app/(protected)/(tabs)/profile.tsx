import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { HeaderImage } from "@/components/profile/ProfileHeadet";
import ProfileOptions from "@/components/userProfile/ProfileOptions";
import AccountActionsModal from "@/components/userProfile/BlurModal";
import { getAuth } from "firebase/auth";
import { useRegistrationState } from "@/hooks/useRegisterationState";

const profile = () => {
  const [action, setAction] = useState<string>("");
  const hideModal = () => setAction("");
  const signOut = async () => {
    await getAuth().signOut();
    useRegistrationState.getState().setRegistrationComplete(false);
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <HeaderImage minHeight={10} />
        <View style={styles.profileOptions}>
          <ProfileOptions setAction={setAction} />
        </View>
      </ScrollView>
      {action.trim() !== "" && (
        <AccountActionsModal
          signOut={signOut}
          action={action}
          closeModal={hideModal}
        />
      )}
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  profileOptions: { marginVertical: 24 },
});
