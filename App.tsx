import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  // o fontsLoaded vai armazenar um valor boolean se a fonte carregou ou não
  // dentro do {} no useFonts eu coloco as fontes que vão ser carregadas
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <SignIn />
    </NativeBaseProvider>
  );
};
