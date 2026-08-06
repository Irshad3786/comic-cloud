import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActiveRoute = "Dashboard" | "Notification" | "CreatePost" | "Profile" | "Settings";

type BottomBarProps = {
  navigation: any;
  activeRoute: ActiveRoute;
};

const BottomBar = ({ navigation, activeRoute }: BottomBarProps) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 px-4 pb-3">
      <View className="rounded-[32px] border-2 border-black bg-white px-4 py-3 shadow-xl">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => navigation.navigate("Dashboard")} className="h-14 flex-1 items-center justify-center">
            <Ionicons name="book-outline" size={24} color={activeRoute === "Dashboard" ? "#0058BE" : "#111827"} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Notification")} className="h-14 flex-1 items-center justify-center">
            <Ionicons name="notifications-outline" size={24} color={activeRoute === "Notification" ? "#0058BE" : "#111827"} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("CreatePost")} className="h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-[#0058BE] shadow-lg">
            <View className="absolute top-2 left-2 right-2 bottom-2 rounded-full bg-[#003f8c]" />
            <View className={`relative h-12 w-12 items-center justify-center rounded-full ${activeRoute === "CreatePost" ? "bg-[#002f6a]" : "bg-[#0058BE]"}`}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Profile")} className="h-14 flex-1 items-center justify-center">
            <Ionicons name="person-outline" size={24} color={activeRoute === "Profile" ? "#0058BE" : "#111827"} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Settings")} className="h-14 flex-1 items-center justify-center">
            <Ionicons name="settings-outline" size={24} color={activeRoute === "Settings" ? "#0058BE" : "#111827"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BottomBar;