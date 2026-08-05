import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";

const posts = [
  {
    id: 1,
    image: require("../assets/images/comic2.png"),
    caption: "New chapter drop. The hero reaches the city edge just before the storm.",
    likes: "3.5k",
    comments: "212",
    time: "2h",
  },
  {
    id: 2,
    image: require("../assets/images/neonchase.png"),
    caption: "Neon Chase preview panel with the final skyline sequence.",
    likes: "4.1k",
    comments: "329",
    time: "5h",
  },
  {
    id: 3,
    image: require("../assets/images/wind.png"),
    caption: "Wind Trial page from today’s sketchbook session.",
    likes: "2.8k",
    comments: "164",
    time: "1d",
  },
  {
    id: 4,
    image: require("../assets/images/god.png"),
    caption: "The god signal scene, redrawn with a darker tone.",
    likes: "5.2k",
    comments: "401",
    time: "2d",
  },
];

const UploadPost = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f3ee]">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-4 pt-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-[20px] border-2 border-black bg-[#0058BE] shadow-lg">
                <View className="absolute inset-2 rounded-[14px] bg-[#003f8c]" />
                <View className="relative h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Ionicons name="person" size={20} color="#0058BE" />
                </View>
              </View>
              <View>
                <Text className="text-[#0058BE] text-3xl font-anybody-bolditalic">PROFILE</Text>
                <Text className="mt-1 font-mono text-xs text-[#0c0c0c]">Your posts and profile activity.</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 rounded-[28px] border-2 border-black bg-white p-4">
            <View className="flex-row items-center gap-3">
              <Image
                source={require("../assets/images/profile1.jpg")}
                className="h-14 w-14 rounded-2xl border-2 border-black"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-[#0c0c0c] font-anybody-bolditalic text-lg">Comic Cloud</Text>
                <Text className="text-gray-600 font-mono text-xs">@comiccloud</Text>
              </View>
              <View className="rounded-full border-2 border-black bg-[#f5f3ee] px-3 py-1">
                <Text className="font-mono text-xs text-[#0c0c0c]">Live profile</Text>
              </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between rounded-[22px] border-2 border-black bg-[#f5f3ee] px-4 py-3">
              <View>
                <Text className="text-[#0058BE] font-anybody-bolditalic text-lg">12.4K</Text>
                <Text className="font-mono text-[11px] text-[#0c0c0c]">Followers</Text>
              </View>
              <View>
                <Text className="text-[#0058BE] font-anybody-bolditalic text-lg">248</Text>
                <Text className="font-mono text-[11px] text-[#0c0c0c]">Following</Text>
              </View>
              <View>
                <Text className="text-[#0058BE] font-anybody-bolditalic text-lg">86</Text>
                <Text className="font-mono text-[11px] text-[#0c0c0c]">Posts</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 rounded-[28px] border-2 border-black bg-white p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[#0058BE] text-2xl font-anybody-bolditalic">My Posts</Text>
                <Text className="mt-1 font-mono text-xs text-[#0c0c0c]">All the comics you have posted</Text>
              </View>
              <Ionicons name="grid-outline" size={22} color="#0c0c0c" />
            </View>

            <View className="mt-4 gap-4">
              {posts.map((post) => (
                <View key={post.id} className="overflow-hidden rounded-[24px] border-2 border-black bg-[#f5f3ee]">
                  <View className="flex-row items-center justify-between px-4 py-3">
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={require("../assets/images/profile1.jpg")}
                        className="h-11 w-11 rounded-full border-2 border-black"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="font-anybody-bolditalic text-[#0c0c0c] text-base">@comiccloud</Text>
                        <Text className="font-mono text-[11px] text-gray-600">{post.time} ago</Text>
                      </View>
                    </View>
                    <Ionicons name="ellipsis-horizontal" size={18} color="#0c0c0c" />
                  </View>

                  <Image source={post.image} className="h-72 w-full" resizeMode="cover" />

                  <View className="px-4 py-4">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-5">
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="heart-outline" size={20} color="#0c0c0c" />
                          <Text className="font-mono text-sm text-[#0c0c0c]">{post.likes}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="chatbubble-outline" size={18} color="#0c0c0c" />
                          <Text className="font-mono text-sm text-[#0c0c0c]">{post.comments}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="paper-plane-outline" size={18} color="#0c0c0c" />
                          <Text className="font-mono text-sm text-[#0c0c0c]">Share</Text>
                        </View>
                      </View>
                      <Ionicons name="bookmark-outline" size={20} color="#0c0c0c" />
                    </View>

                    <Text className="mt-3 text-[#0c0c0c] font-mono text-sm leading-5">
                      <Text className="font-anybody-bolditalic">@comiccloud</Text> {post.caption}
                    </Text>
                    <Text className="mt-2 font-mono text-xs text-gray-600">
                      View all comments
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomBar navigation={navigation} activeRoute="Profile" />
    </SafeAreaView>
  );
};

export default UploadPost;