import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import CreateUserId from './screens/CreateUserId';
import CreateAccount from './screens/CreateAccount';
import VerifyEmail from './screens/VerifyEmail';
import Notification from './screens/Notification';
import UploadPost from './screens/UploadPost';
import Settings from './screens/Profile';
import CreatePost from './screens/CreatePost';

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [loaded] = useFonts({
    AnybodyRegular: require("./assets/fonts/Anybody-Regular.ttf"),
    AnybodyMedium: require("./assets/fonts/Anybody-Medium.ttf"),
    AnybodyBold: require("./assets/fonts/Anybody-Bold.ttf"),
    AnybodyBoldItalic: require("./assets/fonts/Anybody-BoldItalic.ttf"),
     JetBrainsMonoRegular:require("./assets/fonts/JetBrainsMono-Regular.ttf"),
     JetBrainsMonoMedium:require("./assets/fonts/JetBrainsMono-Medium.ttf"),
     JetBrainsMonoBold:require("./assets/fonts/JetBrainsMono-Bold.ttf"),
     JetBrainsMonoItalic:require("./assets/fonts/JetBrainsMono-Italic.ttf"),
  });

  const Stack = createNativeStackNavigator();


  if (!loaded) {
    return null;
  }
  return (
     <SafeAreaProvider >
     <NavigationContainer>
      <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{
        headerShown: false,
        animation:"none"

      }}
      >

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="CreateUserId" component={CreateUserId} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Profile" component={UploadPost} />
        <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
