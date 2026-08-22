import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, View, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { api, VerifyCodeResponse } from "../services/api";

const VerifyEmail = ({ navigation, route }: { navigation: any; route: any }) => {
  const { userId, email } = route.params;

  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(VERIFICATION_CODE_EXPIRY_MINUTES * 60);
  const input0 = useRef<TextInput>(null);
  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const inputRefs = [input0, input1, input2, input3];

  const VERIFICATION_CODE_EXPIRY_MINUTES = 10;

  // Countdown timer for code expiration
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) value = value[0];
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
    // Auto-focus previous input on backspace
    if (!value && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }

    // If all digits filled, auto-submit
    if (newDigits.every(d => d !== '')) {
      handleVerify();
    }
  };

  const handleKeyPress = (index: number, event: any) => {
    if (event.nativeEvent.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleVerify = async () => {
    const code = codeDigits.join('');
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter the full 4-digit code');
      return;
    }

    setLoading(true);
    try {
      const response: VerifyCodeResponse = await api.verifyCode(userId, code);

      Alert.alert(
        'Success!',
        'Email verified successfully',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('CreateUserId', { userId, email }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid verification code. Please try again.');
      // Clear code on error
      setCodeDigits(['', '', '', '']);
      inputRefs[0]?.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await api.resendVerificationCode(userId);
      setResendCooldown(60); // 60 seconds cooldown
      setTimeRemaining(VERIFICATION_CODE_EXPIRY_MINUTES * 60); // Reset expiration timer
      Alert.alert('Success', 'Verification code resent. Please check your email.');
      // Clear current code inputs
      setCodeDigits(['', '', '', '']);
      inputRefs[0]?.current?.focus();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className="flex-1">
        <Text className="text-[#0058BE] text-4xl text-center pt-4 font-anybody-bolditalic">
          COMIC CLOUD
        </Text>

        <Text className="text-[#0c0c0c] text-2xl text-center pt-4 font-anybody-bolditalic">
          VERIFY YOUR EMAIL
        </Text>

        <Text className="text-[#0c0c0c] text-base text-center pt-2 px-4 font-mono">
          We sent a 4-digit verification code to
        </Text>
        <Text className="text-[#0058BE] text-lg text-center pt-1 font-mono-bold">
          {maskedEmail}
        </Text>

        <Text className="text-[#0c0c0c] text-sm text-center pt-2 px-4 font-mono">
          Enter the code below to verify your email address
        </Text>

        {/* Code Input Fields */}
        <View className="flex-row justify-center gap-3 mt-8 mb-4">
          {codeDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index] as any}
              value={digit}
              onChangeText={(value) => handleDigitChange(index, value)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              maxLength={1}
              className="w-14 h-14 text-center text-3xl font-mono-bold text-black bg-white border-2 border-black rounded-xl"
              keyboardType="number-pad"
              textAlign="center"
              autoFocus={index === 0}
              selectionColor="#0058BE"
            />
          ))}
        </View>

        {/* Timer */}
        <View className="flex-row items-center justify-center gap-2 mb-6">
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text className="text-[#666] font-mono text-sm">
            Code expires in: <Text className="font-mono-bold">{formatTime(timeRemaining)}</Text>
          </Text>
        </View>

        {/* Verify Button */}
        <View className="mt-6">
          <View className="absolute top-2 left-7 w-[88%] h-14 bg-[#003f8c]" />

          <Pressable
            onPress={handleVerify}
            disabled={loading || codeDigits.some(d => d === '')}
            className="bg-[#0058BE] left-5 w-[88%] h-14 justify-center items-center border-2 border-black"
            style={{ opacity: loading || codeDigits.some(d => d === '') ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <View className="flex-row gap-3">
                <Text className="text-white text-3xl font-anybody-bolditalic">
                  VERIFY
                </Text>
                <Ionicons name="arrow-forward" size={30} color="white" />
              </View>
            )}
          </Pressable>
        </View>

        {/* Resend Code */}
        <View className="mt-6">
          <Text className="text-center font-mono text-sm text-[#666]">
            Didn't receive the code?
          </Text>
          <Pressable
            onPress={handleResend}
            disabled={resending || resendCooldown > 0}
            className="mt-2"
          >
            <Text className="text-center font-mono-bold text-lg">
              {resendCooldown > 0
                ? `Resend in {resendCooldown}s`
                : resending
                ? 'Sending...'
                : 'Resend Code'}
            </Text>
          </Pressable>
        </View>

        {/* Help Text */}
        <View className="mt-8 px-4">
          <Text className="text-center text-xs font-mono text-gray-500">
            Didn't receive the email? Check your spam folder or make sure you entered the correct email address.
          </Text>
        </View>

        {/* Back to Login */}
        <View className="mt-8">
          <Text className="text-center font-mono text-lg">
            Already verified?{" "}
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
};

export default VerifyEmail;