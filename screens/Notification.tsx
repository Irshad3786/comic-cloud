import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";

const notifications = [
  {
    title: "New chapter posted",
    message: "Adventure just published a new chapter for your feed.",
    time: "2 mins ago",
  },
  {
    title: "Your story got likes",
    message: "The Neon Chase received 148 new likes today.",
    time: "18 mins ago",
  },
  {
    title: "New follower",
    message: "Maya Ink started following your comic updates.",
    time: "1 hour ago",
  },
];

const Notification = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f3ee]">
      <View className="px-4 pt-3">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[#0058BE] text-4xl font-anybody-bolditalic">NOTIFICATIONS</Text>
            <Text className="mt-1 font-mono text-sm text-[#0c0c0c]">Stay updated on your comics.</Text>
          </View>
        </View>

        <ScrollView className="mt-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="gap-4">
            {notifications.map((item) => (
              <View key={item.title} className="rounded-[28px] border-2 border-black bg-white p-4">
                <View className="flex-row items-start gap-3">
                  <View className="mt-1 h-12 w-12 items-center justify-center rounded-2xl bg-[#0058BE]">
                    <Ionicons name="notifications-outline" size={22} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-anybody-bolditalic text-[#0c0c0c]">{item.title}</Text>
                    <Text className="mt-1 font-mono text-sm text-[#0c0c0c]">{item.message}</Text>
                    <Text className="mt-2 font-mono text-xs text-gray-500">{item.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <BottomBar navigation={navigation} activeRoute="Notification" />
    </SafeAreaView>
  );
};

export default Notification;