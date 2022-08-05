import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

export default function App() {
  // o fontsLoaded vai armazenar um valor boolean se a fonte carregou ou não
  // dentro do {} no useFonts eu coloco as fontes que vão ser carregadas
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {
        /* 
          se as fontes já carregaram(fontsLoaded = true) vai mostrar o SignIn
          Se não vai mostrar o componente de Loading
        */
      }
      { fontsLoaded ? <SignIn /> : <Loading /> }
    </NativeBaseProvider>
  );
};
