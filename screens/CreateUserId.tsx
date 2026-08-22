import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Text, TextInput, View, Pressable, Image, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { api, CheckUserIdAvailabilityResponse } from "../services/api";

const CreateUserId = ({ navigation, route }: { navigation: any; route: any }) => {
  const { userId, email } = route.params || {};
  const [userIdValue, setUserIdValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [availability, setAvailability] = useState<'unknown' | 'available' | 'taken'>('unknown');
  const [error, setError] = useState('');
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validateUserId = (value: string): boolean => {
    // Alphanumeric and underscore, 3-30 chars
    const regex = /^[a-zA-Z0-9_]{3,30}$/;
    return regex.test(value);
  };

  const handleUserIdChange = (value: string) => {
    // Only allow alphanumeric and underscore
    const sanitized = value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
    setUserIdValue(sanitized);
    setError('');
    setAvailability('unknown');

    // Debounce availability check
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    if (sanitized.length >= 3) {
      checkTimeoutRef.current = setTimeout(async () => {
        setChecking(true);
        try {
          const result: CheckUserIdAvailabilityResponse = await api.checkUserIdAvailability(sanitized);
          setAvailability(result.available ? 'available' : 'taken');
        } catch (err: any) {
          console.error('Availability check failed:', err);
        } finally {
          setChecking(false);
        }
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!validateUserId(userIdValue)) {
      setError('User ID must be 3-30 characters (letters, numbers, underscore only)');
      return;
    }

    if (availability === 'taken') {
      setError('This user ID is already taken');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await api.createUserId(userId, userIdValue);
      Alert.alert(
        'Success!',
        'Your user ID has been set',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (err: any) {
      setError(err.message || 'Failed to create user ID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  const getInputStyle = () => {
    if (availability === 'available') return 'border-green-600';
    if (availability === 'taken') return 'border-red-500';
    if (checking) return 'border-yellow-500';
    return 'border-black';
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className="flex-1">
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
          value={userIdValue}
          onChangeText={handleUserIdChange}
          className={`w-[88%] h-14 ml-4 mt-2 bg-white px-4 text-black border-2 ${getInputStyle()}`}
        />
        {checking && (
          <Text className="mt-2 ml-4 text-sm font-mono text-yellow-600">
            Checking availability...
          </Text>
        )}
        {availability === 'available' && (
          <Text className="mt-2 ml-4 text-sm font-mono text-green-600">
            ✓ This user ID is available
          </Text>
        )}
        {availability === 'taken' && (
          <Text className="mt-2 ml-4 text-sm font-mono text-red-500">
            ✗ This user ID is already taken
          </Text>
        )}
        {error && (
          <Text className="mt-2 ml-4 text-sm font-mono text-red-500">
            {error}
          </Text>
        )}

        <Text className="mt-4 px-4 text-sm font-mono text-gray-600">
          Your user ID will be visible to other Comic Cloud users. 3-30 characters (letters, numbers, underscore).
        </Text>

        <View className="mt-8">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={handleSubmit}
            disabled={loading || !validateUserId(userIdValue) || availability !== 'available'}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
            style={{ opacity: loading || !validateUserId(userIdValue) || availability !== 'available' ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <View className="flex-row gap-3">
                <Text className="text-white text-3xl font-anybody-bolditalic">
                  CONTINUE
                </Text>
                <Ionicons name="arrow-forward" size={30} color="white" />
              </View>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CreateUserId;