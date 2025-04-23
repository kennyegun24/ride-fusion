import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const support = () => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View>
        {contactItems.map((item) => (
          <View
            key={item.action}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              paddingVertical: 24,
              justifyContent: "space-between",
              borderBottomColor: "#E9E9E9",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              {item.icon({ size: 24, color: "#333" })}
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ color: "#888" }}>{item.description}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#414141" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default support;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 12,
  },
});

import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ReactElement } from "react";

type IconProps = { size: number; color: string };

interface ContactItem {
  icon: (props: IconProps) => ReactElement;
  title: string;
  description: string;
  action: string;
}

export const contactItems: ContactItem[] = [
  {
    icon: (props) => <MaterialCommunityIcons name="phone-in-talk" {...props} />,
    title: "070022552528",
    description: "Our call center is open to you 24/7",
    action: "call",
  },
  {
    icon: (props) => <MaterialCommunityIcons name="email-outline" {...props} />,
    title: "help@ridefusion.ng",
    description: "Send us an email for any inquiry",
    action: "email",
  },
  {
    icon: (props) => <FontAwesome5 name="facebook" {...props} />,
    title: "ridefusion.ng",
    description: "Follow us on Facebook",
    action: "facebook",
  },
  {
    icon: (props) => <FontAwesome name="instagram" {...props} />,
    title: "ridefusion.ng",
    description: "Follow us on Instagram",
    action: "instagram",
  },
  {
    icon: (props) => <FontAwesome6 name="x-twitter" {...props} />,
    title: "ridefusion.ng",
    description: "Follow us on Twitter",
    action: "twitter",
  },
];
