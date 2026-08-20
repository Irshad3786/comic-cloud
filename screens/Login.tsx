import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, View, Pressable, ScrollView  } from "react-native";
import React from 'react'
import { FontAwesome , Ionicons } from "@expo/vector-icons";




const Login = ({ navigation }:{navigation:any}) => {
  return (
     <ScrollView>
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
    onPress={() => navigation.navigate('Dashboard')}
    className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
  >
    <View className="flex-row gap-3">
      <Text className="text-white text-3xl font-anybody-bolditalic">
        LOGIN
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



  
    
    <View className=" mt-6">
      <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#090909]" />

        <Pressable
          onPress={() => console.log("google")}
          className="bg-[#ffffff] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
        >
        <View className="flex-row gap-4">
        <FontAwesome name="google" size={30} color="black" />
        <Text className="text-balck text-3xl font-mono-bold">GOOGLE</Text>
        </View>
        </Pressable>
    </View>
    

    <View>
      <Text className="mt-8 text-center font-mono text-lg">
        Don&apos;t have an account?{" "}
        <Text
          onPress={() => navigation.navigate('CreateAccount')}
          className="text-[#0058BE] font-anybody-bolditalic text-xl"
        >
          Sign Up
        </Text>
      </Text>
    </View>
    
    
    

    </SafeAreaView>
    </ScrollView>
  )
}

export default Login

