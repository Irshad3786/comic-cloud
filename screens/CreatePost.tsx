import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";

const styleOptions = [
  "Manga Ink",
  "Neo Pop",
  "Retro Noir",
  "Watercolor Comic",
] as const;
const panelOptions = [1, 2, 3, 4] as const;

const CreatePost = ({ navigation }: { navigation: any }) => {
  const [selectedStyle, setSelectedStyle] = useState<(typeof styleOptions)[number]>("Manga Ink");
  const [selectedPanels, setSelectedPanels] = useState<(typeof panelOptions)[number]>(4);
  const [storyInput, setStoryInput] = useState("");
  const [referenceAdded, setReferenceAdded] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f3ee]">
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>
        <View className="px-4 pt-3">
          <Text className="text-[#0058BE] text-4xl font-anybody-bolditalic">CREATE POST</Text>
          <Text className="mt-1 font-mono text-sm text-[#0c0c0c]">Build a comic post from prompt and style options.</Text>

          <View className="mt-6 overflow-hidden rounded-[28px] border-2 border-black bg-white">
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-[#0c0c0c] text-lg font-anybody-bolditalic">Generated Image</Text>
              <View className="rounded-full border-2 border-black bg-[#e8f1ff] px-3 py-1">
                <Text className="font-mono text-[11px] text-[#0058BE]">Dummy Preview</Text>
              </View>
            </View>

            <Image source={require("../assets/images/neonchase.png")} className="h-64 w-full" resizeMode="cover" />
          </View>

          <View className="mt-6 rounded-[28px] border-2 border-black bg-white p-4">
            <Text className="text-[#0058BE] text-2xl font-anybody-bolditalic">Post Controls</Text>

            <Text className="mt-4 font-mono-bold text-[#0c0c0c]">COMIC STYLE</Text>
            <View className="mt-2 gap-3">
              {styleOptions.map((option) => {
                const active = option === selectedStyle;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedStyle(option)}
                    className={`min-h-12 flex-row items-center justify-between rounded-xl border-2 border-black px-4 py-3 ${active ? "bg-[#0058BE]" : "bg-[#f5f3ee]"}`}
                  >
                    <Text className={`text-base font-anybody-bolditalic ${active ? "text-white" : "text-[#0c0c0c]"}`}>{option}</Text>
                    <Ionicons name={active ? "checkmark-circle" : "ellipse-outline"} size={20} color={active ? "#ffffff" : "#0c0c0c"} />
                  </Pressable>
                );
              })}
            </View>

            <Text className="mt-5 font-mono-bold text-[#0c0c0c]">COMIC PANELS</Text>
            <View className="mt-2 flex-row gap-3">
              {panelOptions.map((option) => {
                const active = option === selectedPanels;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedPanels(option)}
                    className={`h-12 w-12 items-center justify-center rounded-xl border-2 border-black ${active ? "bg-[#0c0c0c]" : "bg-white"}`}
                  >
                    <Text className={`font-mono-bold text-lg ${active ? "text-white" : "text-[#0c0c0c]"}`}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Text className="mt-5 font-mono-bold text-[#0c0c0c]">PROMPT + DIALOGUES</Text>
            <View className="mt-2 rounded-2xl border-2 border-black bg-[#eef5ff] p-3">
              <Text className="font-anybody-bolditalic text-[#0c0c0c] text-base">Prompt Tip</Text>
              <Text className="mt-2 font-mono text-xs leading-5 text-[#0c0c0c]">
                Mention scene, main characters, mood, and short dialogues. Example: "Rainy city rooftop chase, hero angry, villain calm. Dialogue: Hero: I will stop you. Villain: Try me."
              </Text>
            </View>
            <TextInput
              value={storyInput}
              onChangeText={setStoryInput}
              placeholder={"Write your full comic generation prompt here..."}
              multiline
              className="mt-2 min-h-40 rounded-2xl border-2 border-black bg-[#f7f9fc] px-4 py-3 text-[#0c0c0c]"
              textAlignVertical="top"
            />

            <Pressable
              onPress={() => setReferenceAdded((prev) => !prev)}
              className="mt-5 flex-row items-center justify-between rounded-2xl border-2 border-black bg-[#f5f3ee] px-4 py-3"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="images-outline" size={20} color="#0c0c0c" />
                <Text className="font-mono-bold text-[#0c0c0c]">Upload Reference</Text>
              </View>
              <Text className="font-mono text-xs text-[#0058BE]">{referenceAdded ? "Added" : "Tap to add"}</Text>
            </Pressable>

            <Pressable className="mt-5 h-14 items-center justify-center rounded-2xl border-2 border-black bg-[#0058BE]">
              <View className="flex-row items-center gap-2">
                <Ionicons name="sparkles-outline" size={20} color="white" />
                <Text className="text-white text-xl font-anybody-bolditalic">GENERATE POST</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomBar navigation={navigation} activeRoute="CreatePost" />
    </SafeAreaView>
  );
};

export default CreatePost;
