import { NativeBaseProvider } from 'native-base';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  return (
    <NativeBaseProvider>
      <SignIn />
    </NativeBaseProvider>
  );
};
