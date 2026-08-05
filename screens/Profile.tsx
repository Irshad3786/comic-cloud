import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomBar from "../components/BottomBar";

const Profile = ({ navigation }: { navigation: any }) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState("Comic Creator");
  const [username, setUsername] = useState("@comiccloud");
  const [bio, setBio] = useState("Building stories one panel at a time.");

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow photo access to add a profile image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f3ee]">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="px-4 pt-3">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[#0058BE] text-4xl font-anybody-bolditalic">SETTINGS</Text>
              <Text className="mt-1 font-mono text-sm text-[#0c0c0c]">Manage your account and preferences.</Text>
            </View>
          </View>

          <View className="mt-8 items-center rounded-[32px] border-2 border-black bg-white p-5">
            <Pressable onPress={pickPhoto} className="relative">
              {photoUri ? (
                <Image source={{ uri: photoUri }} className="h-32 w-32 rounded-full border-2 border-black" />
              ) : (
                <View className="h-32 w-32 items-center justify-center rounded-full border-2 border-black bg-[#0058BE]">
                  <Ionicons name="person" size={56} color="white" />
                </View>
              )}
              <View className="absolute bottom-1 right-1 h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#f5f3ee]">
                <Ionicons name="camera" size={18} color="#0c0c0c" />
              </View>
            </Pressable>

            <Text className="mt-4 text-2xl font-anybody-bolditalic text-[#0c0c0c]">{name}</Text>
            <Text className="mt-1 font-mono text-sm text-gray-600">{username}</Text>
          </View>

          <View className="mt-6 gap-4">
            <View>
              <Text className="mb-2 font-mono-bold text-[#0c0c0c]">NAME</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="h-14 rounded-2xl border-2 border-black bg-white px-4 text-[#0c0c0c]"
              />
            </View>

            <View>
              <Text className="mb-2 font-mono-bold text-[#0c0c0c]">USERNAME</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="h-14 rounded-2xl border-2 border-black bg-white px-4 text-[#0c0c0c]"
              />
            </View>

            <View>
              <Text className="mb-2 font-mono-bold text-[#0c0c0c]">BIO</Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                multiline
                className="min-h-28 rounded-2xl border-2 border-black bg-white px-4 py-3 text-[#0c0c0c]"
              />
            </View>
          </View>

          <View className="mt-6 rounded-[28px] border-2 border-black bg-white p-4">
            <Text className="text-[#0058BE] text-2xl font-anybody-bolditalic">Settings</Text>
            <Text className="mt-1 font-mono text-xs text-[#0c0c0c]">Manage your profile preferences</Text>

            <View className="mt-4 gap-3">
              <Pressable className="flex-row items-center justify-between rounded-[22px] border-2 border-black bg-[#f5f3ee] px-4 py-4">
                <View>
                  <Text className="font-anybody-bolditalic text-[#0c0c0c] text-lg">Notifications</Text>
                  <Text className="mt-1 font-mono text-xs text-gray-600">Control alerts and updates</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#0c0c0c" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between rounded-[22px] border-2 border-black bg-[#f5f3ee] px-4 py-4">
                <View>
                  <Text className="font-anybody-bolditalic text-[#0c0c0c] text-lg">Privacy</Text>
                  <Text className="mt-1 font-mono text-xs text-gray-600">Manage account visibility</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#0c0c0c" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between rounded-[22px] border-2 border-black bg-[#f5f3ee] px-4 py-4">
                <View>
                  <Text className="font-anybody-bolditalic text-[#0c0c0c] text-lg">Account</Text>
                  <Text className="mt-1 font-mono text-xs text-gray-600">Edit email, password, and details</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#0c0c0c" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomBar navigation={navigation} activeRoute="Settings" />
    </SafeAreaView>
  );
};

export default Profile;