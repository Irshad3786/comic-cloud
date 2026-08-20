import { Text, TextInput, View, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { api, CreateAccountRequest } from "../services/api";

const CreateAccount = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState<CreateAccountRequest>({
    email: '',
    password: '',
    name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateAccountRequest & { confirmPassword: string }>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateAccountRequest & { confirmPassword: string }> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.createAccount({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        name: formData.name.trim(),
      });

      Alert.alert(
        'Success!',
        'Account created successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('CreateUserId'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateAccountRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

        <Text className="text-[#0c0c0c] text-2xl text-center pt-4 font-anybody-bolditalic">
          CREATE YOUR ACCOUNT
        </Text>

        {/* Full Name */}
        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          FULL NAME
        </Text>
        <TextInput
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
          autoCapitalize="words"
        />
        {errors.name && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.name}</Text>
        )}

        {/* Email */}
        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          EMAIL ADDRESS
        </Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
        />
        {errors.email && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.email}</Text>
        )}

        {/* Password */}
        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          PASSWORD
        </Text>
        <TextInput
          placeholder="Create a password (min 8 characters)"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
        />
        {errors.password && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.password}</Text>
        )}

        {/* Confirm Password */}
        <Text className="text-[#0c0c0c] text-xl text-start pt-6 pl-4 font-mono-bold">
          CONFIRM PASSWORD
        </Text>
        <TextInput
          placeholder="Re-enter your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 border-black"
        />
        {errors.confirmPassword && (
          <Text className="text-red-500 text-sm ml-4 mt-1">{errors.confirmPassword}</Text>
        )}

        {/* Sign Up Button */}
        <View className="mt-6">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black opacity-50"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <View className="flex-row gap-3">
                <Text className="text-white text-3xl font-anybody-bolditalic">
                  SIGN UP
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

        {/* Login Link */}
        <View>
          <Text className="mt-8 text-center font-mono text-lg">
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate('Login')}
              className="text-[#0058BE] font-anybody-bolditalic text-xl"
            >
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CreateAccount;