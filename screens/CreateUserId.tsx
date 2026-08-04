import React from "react";
import { ScrollView, Text, TextInput, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CreateUserId = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Text className="text-[#0058BE] text-4xl text-center pt-4 font-anybody-bolditalic">
          COMIC CLOUD
        </Text>

        <Image
          source={require("../assets/images/comic2.png")}
          className="w-96 h-72 self-center rounded-3xl mt-5 border-black border-2"
          resizeMode="cover"
        />

        <Text className="text-[#0c0c0c] text-2xl text-center pt-10 font-anybody-bolditalic">
          CHOOSE YOUR USER ID
        </Text>

        <Text className="text-[#0c0c0c] text-xl text-start pt-10 pl-4 font-mono-bold">
          USER ID
        </Text>
        <TextInput
          placeholder="Enter your user id"
          autoCapitalize="none"
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-black border-2"
        />

        <Text className="mt-4 px-4 text-sm font-mono text-gray-600">
          Your user id will be visible to other Comic Cloud users.
        </Text>

        <View className="mt-8">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={() => console.log("Continue")}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
          >
            <View className="flex-row gap-3">
              <Text className="text-white text-3xl font-anybody-bolditalic">
                CONTINUE
              </Text>
              <Ionicons name="arrow-forward" size={30} color="white" />
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CreateUserId;