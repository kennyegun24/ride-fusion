import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { ThemedView } from "../ThemedView";

const ProfileLoader = () => {
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={{ alignItems: "center", paddingHorizontal: 12 }}>
          <Skeleton
            height={120}
            width={120}
            radius={100}
            colorMode={theme || "dark"}
          />

          <View style={{ gap: 8, marginTop: 24, alignItems: "center" }}>
            <Skeleton
              height={20}
              width={100}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={20}
              width={170}
              radius={100}
              colorMode={theme || "dark"}
            />
          </View>

          <View style={{ width: "100%", marginTop: 42, gap: 6 }}>
            <Skeleton
              height={20}
              width={100}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={20}
              width={190}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={20}
              width={170}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={20}
              width={150}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={20}
              width={200}
              radius={100}
              colorMode={theme || "dark"}
            />
          </View>

          <View style={{ width: "100%", marginTop: 42, gap: 6 }}>
            <Skeleton
              height={20}
              width={100}
              radius={100}
              colorMode={theme || "dark"}
            />
            <Skeleton
              height={100}
              width={"100%"}
              radius={6}
              colorMode={theme || "dark"}
            />
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ProfileLoader;

const styles = StyleSheet.create({});
