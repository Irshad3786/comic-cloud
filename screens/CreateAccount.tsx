import { Text, Image, TextInput, View, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const CreateAccount = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Text className="text-[#0058BE] text-4xl text-center pt-4 font-anybody-bolditalic">
          COMIC CLOUD
        </Text>

       

        <Text className="text-[#0c0c0c] text-2xl text-center pt-4 font-anybody-bolditalic">
          CREATE YOUR ACCOUNT
        </Text>

        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          FULL NAME
        </Text>
        <TextInput
          placeholder="Enter your full name"
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-black border-2"
        />

        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          EMAIL ADDRESS
        </Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-black border-2"
        />

        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          PASSWORD
        </Text>
        <TextInput
          placeholder="Create a password"
          secureTextEntry
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-black border-2"
        />

        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          CONFIRM PASSWORD
        </Text>
        <TextInput
          placeholder="Re-enter your password"
          secureTextEntry
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-black border-2"
        />

        <View className="mt-6">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={() => console.log("Create Account")}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
          >
            <View className="flex-row gap-3">
              <Text className="text-white text-3xl font-anybody-bolditalic">
                SIGN UP
              </Text>
              <Ionicons name="arrow-forward" size={30} color="white" />
            </View>
          </Pressable>
        </View>

        <View className="flex-row items-center justify-between mt-8 px-4">
          <View className="h-[3px] bg-gray-400 flex-1" />
          <Text className="mx-3 font-mono">OR CONTINUE WITH</Text>
          <View className="h-[3px] bg-gray-400 flex-1" />
        </View>

        <View className="mt-6">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#090909]" />

          <Pressable
            onPress={() => console.log("google")}
            className="bg-[#ffffff] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
          >
            <View className="flex-row gap-4">
              <FontAwesome name="google" size={30} color="black" />
              <Text className="text-black text-3xl font-mono-bold">GOOGLE</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Text className="mt-8 text-center font-mono text-lg">
            Already have an account?{" "}
            <Text className="text-[#0058BE] font-anybody-bolditalic text-xl">
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CreateAccount;