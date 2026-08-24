import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, View, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from 'react';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { api, LoginResponse } from "../services/api";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response: LoginResponse = await api.login({
        email: email.toLowerCase().trim(),
        password,
      });

      const { user } = response;

      // Navigate based on user status
      if (user.status === 'pending_email_verification') {
        // Email not verified yet - go to OTP verification
        Alert.alert(
          'Verify Email',
          'Please verify your email to continue',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('VerifyEmail', {
                userId: user.id,
                email: user.email,
              }),
            },
          ]
        );
      } else if (user.status === 'email_verified' && !user.userId) {
        // Email verified but no user ID yet - go to create user ID
        navigation.navigate('CreateUserId', {
          userId: user.id,
          email: user.email,
        });
      } else if (user.status === 'active' || user.userId) {
        // Fully set up - go to dashboard
        navigation.navigate('Dashboard');
      } else {
        // Fallback
        navigation.navigate('Dashboard');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className="flex-1">
        <Text className="text-[#0058BE] text-4xl text-center pt-4 font-anybody-bolditalic">
          COMIC CLOUD
        </Text>
        <Image
          source={require("../assets/images/comic.png")}
          className="w-96 h-72 self-center rounded-3xl mt-5 border-black border-2"
          resizeMode="cover"
        />
        <Text className="text-[#0c0c0c] text-2xl text-center pt-1 font-anybody-bolditalic">
          READY TO CREATE ?
        </Text>

        {/* Email */}
        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          EMAIL ADDRESS
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(value) => handleInputChange('email', value)}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.email}</Text>
        )}

        {/* Password */}
        <View className="flex-row justify-between mt-4">
          <Text className="text-[#0c0c0c] text-xl text-start pt-2 pl-4 font-mono-bold">
            PASSWORD
          </Text>
          <Text className="text-[#0058BE] text-xl text-start pt-2 pr-12 font-mono-bold">
            Forgot Password?
          </Text>
        </View>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(value) => handleInputChange('password', value)}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
        />
        {errors.password && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.password}</Text>
        )}

        {/* Login Button */}
        <View className="mt-6">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <View className="flex-row gap-3">
                <Text className="text-white text-3xl font-anybody-bolditalic">
                  LOGIN
                </Text>
                <Ionicons name="arrow-forward" size={30} color="white" />
              </View>
            )}
          </Pressable>
        </View>

        {/* Divider */}
        <View className="flex-row items-center justify-between mt-8 px-4">
          <View className="h-[3px] bg-gray-400 flex-1" />
          <Text className="mx-3 font-mono">OR CONTINUE WITH</Text>
          <View className="h-[3px] bg-gray-400 flex-1" />
        </View>

        {/* Google Sign In */}
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

        {/* Sign Up Link */}
        <View>
          <Text className="mt-8 text-center font-mono text-lg">
            Don't have an account?{" "}
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
  );
}

export default Login;