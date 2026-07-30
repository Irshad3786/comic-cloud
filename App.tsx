import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from "./screens/Login";
import { useFonts } from "expo-font";

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

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider >
       <Login/>
    </SafeAreaProvider>
  );
}
