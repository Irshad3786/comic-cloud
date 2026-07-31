import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, View, Pressable  } from "react-native";
import React from 'react'



const Login = () => {
  return (
      <SafeAreaView >
      <Text  className=" text-[#0058BE] text-4xl   text-center pt-4 font-anybody-bolditalic ">COMIC CLOUD</Text>
      <Image
      source={require("../assets/images/comic.png")}
      className="w-96 h-96 self-center rounded-3xl mt-5 border-black border-4"
      resizeMode="cover"
    />
    <Text  className=" text-[#0c0c0c] text-2xl text-center pt-1 font-anybody-bolditalic ">READY TO CREATE ?</Text>
    <Text  className=" text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold ">EMAIL ADDRESS</Text>
    <TextInput
      placeholder="Enter your email"
      className="w-[88%] h-14 ml-4 mt-2 bg-white  px-4 text-black border-black border-2"
    />
    <View className="flex-row justify-between ">
      <Text  className=" text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold ">PASSWORD</Text>
      <Text  className=" text-[#0058BE] text-xl text-start pt-6 pr-12 font-mono-bold ">Forgot Password?</Text>
    </View>
    <TextInput
      placeholder="Enter your password"
      className="w-[88%] h-14 ml-4 mt-2 bg-white  px-4 text-black border-black border-2"
    />

    <Pressable
    onPress={() => console.log("Login")}
    className="bg-blue-600 w-[88%] ml-4 mt-6 h-14  justify-center items-center active:opacity-80  border-black border-4"
  >
    <Text className="text-white text-3xl font-anybody-bolditalic ">
      LOGIN
    </Text>
  </Pressable>

    </SafeAreaView>
  )
}

export default Login

