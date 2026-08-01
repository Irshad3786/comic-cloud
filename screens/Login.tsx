import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, View, Pressable  } from "react-native";
import React from 'react'



const Login = () => {
  return (
      <SafeAreaView >
      <Text  className=" text-[#0058BE] text-4xl   text-center pt-4 font-anybody-bolditalic ">COMIC CLOUD</Text>
      <Image
      source={require("../assets/images/comic.png")}
      className="w-96 h-72 self-center rounded-3xl mt-5 border-black border-2"
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
      secureTextEntry
      className="w-[88%] h-14 ml-4 mt-2 bg-white  px-4 text-black border-black border-2"
    />

<View className=" mt-6">
  <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

  <Pressable
    onPress={() => console.log("Login")}
    className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
  >
    <Text className="text-white text-3xl font-anybody-bolditalic">
      LOGIN
    </Text>
  </Pressable>
    </View>

    <View className="flex-row items-center justify-between mt-8 px-4">
      <View className="h-[3px] bg-gray-400 flex-1" />
      <Text className="mx-3 font-mono">OR CONTINUE WITH</Text>
      <View className="h-[3px] bg-gray-400 flex-1" />
    </View>
        

    </SafeAreaView>
    
  )
}

export default Login

