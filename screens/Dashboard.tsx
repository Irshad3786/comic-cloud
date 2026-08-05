import React from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";

const stories = [
  {
    title: "Adventure",
    image: require("../assets/images/adventure.png"),
  },
  {
    title: "Daily Heroes",
    image: require("../assets/images/dailyheroes.png"),
  },
  {
    title: "Haunted House",
    image: require("../assets/images/hauntedhouse.png"),
  },
  {
    title: "Mystery",
    image: require("../assets/images/mystre.png"),
  },
];

const feedPosts = [
  {
    title: "Chapter 04: The Neon Chase",
    author: "Orion Sketch",
    time: "2 mins ago",
    avatar: require("../assets/images/profile1.jpg"),
    description:
      "The hero reaches the skyline, the signal flashes, and the chase begins across the city lights.",
    image: require("../assets/images/neonchase.png"),
    likes: "1.2k",
    comments: "84",
  },
  {
    title: "Chapter 05: The Wind Trial",
    author: "Aarav Panel",
    time: "8 mins ago",
    avatar: require("../assets/images/profile2.jpg"),
    description:
      "A sudden wind storm changes the path, and the next move has to be faster than the sky.",
    image: require("../assets/images/wind.png"),
    likes: "980",
    comments: "61",
  },
  {
    title: "Chapter 06: The God Signal",
    author: "Maya Ink",
    time: "15 mins ago",
    avatar: require("../assets/images/profle3.jpg"),
    description:
      "A silent message appears above the city, and the legend of the watcher begins to open.",
    image: require("../assets/images/god.png"),
    likes: "2.1k",
    comments: "140",
  },
];

const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f3ee]">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-4 pt-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-[20px] border-2 border-black bg-[#0058BE] shadow-lg">
                <View className="absolute inset-2 rounded-[14px] bg-[#003f8c]" />
                <View className="relative h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Feather name="cloud" size={20} color="#0058BE" />
                </View>
              </View>
              <View>
                <Text className="text-[#0058BE] text-3xl font-anybody-bolditalic">
                  Comic Cloud
                </Text>
                <Text className="text-[#0c0c0c] mt-1 font-mono text-xs">
                  Discover, create, and post your comic stories.
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-8 flex-row items-center justify-between">
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-[#0c0c0c] text-2xl font-anybody-bolditalic">
                  Comic Stories
                </Text>
                <View className="h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#0058BE]">
                  <Ionicons name="checkmark" size={14} color="white" />
                </View>
              </View>
              <Text className="mt-1 font-mono text-xs text-[#0c0c0c]">
                by Comic Cloud
              </Text>
            </View>
            <Pressable className="flex-row items-center gap-1 rounded-full border-2 border-black bg-white px-3 py-2">
              <Ionicons name="filter" size={16} color="#0c0c0c" />
              <Text className="font-mono text-xs text-[#0c0c0c]">Sort</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row gap-4">
              {stories.map((story) => (
                <View
                  key={story.title}
                  className="w-56 rounded-[28px] border-2 border-black overflow-hidden bg-white"
                >
                  <View className="h-72">
                    <Image
                      source={story.image}
                      className="h-52 w-full"
                      resizeMode="cover"
                    />
                    <View className="h-20 justify-center px-4 bg-white">
                      <View className="h-1.5 w-14 rounded-full bg-[#0058BE] mb-2" />
                      <Text className="text-[#0c0c0c] text-2xl font-anybody-bolditalic" numberOfLines={1}>
                        {story.title}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <View className="mt-8">
            <Text className="text-[#0c0c0c] text-2xl font-anybody-bolditalic">
              Your Feed
            </Text>
            <ScrollView className="mt-4" showsVerticalScrollIndicator={false} nestedScrollEnabled>
              <View className="gap-4">
                {feedPosts.map((post) => (
                  <View
                    key={post.title}
                    className="overflow-hidden rounded-[28px] border-2 border-black bg-white"
                  >
                    <Image
                      source={post.image}
                      className="h-56 w-full"
                      resizeMode="cover"
                    />

                    <View className="p-4">
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                          <Image
                            source={post.avatar}
                            className="h-12 w-12 rounded-2xl border-2 border-black"
                            resizeMode="cover"
                          />
                          <View>
                            <Text className="text-[#0c0c0c] font-anybody-bolditalic text-lg">
                              {post.author}
                            </Text>
                            <Text className="text-gray-600 font-mono text-xs">{post.time}</Text>
                          </View>
                        </View>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#0c0c0c" />
                      </View>

                      <Text className="mt-4 text-[#0058BE] font-anybody-bolditalic text-xl">
                        {post.title}
                      </Text>
                      <Text className="mt-2 text-[#0c0c0c] font-mono text-sm leading-5">
                        {post.description}
                      </Text>

                      <View className="mt-4 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-4">
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="heart-outline" size={20} color="#0c0c0c" />
                            <Text className="font-mono text-sm text-[#0c0c0c]">{post.likes}</Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Ionicons name="chatbubble-outline" size={18} color="#0c0c0c" />
                            <Text className="font-mono text-sm text-[#0c0c0c]">{post.comments}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <BottomBar navigation={navigation} activeRoute="Dashboard" />
    </SafeAreaView>
  );
};

export default Dashboard;