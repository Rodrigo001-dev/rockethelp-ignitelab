import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';
import { SignIn } from '../screens/SignIn';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    // no subscriber eu consigo ficar observando se o usuário está ou não 
    // autenticado atraves do método auth().onAuthStateChanged()
    const subscriber = auth()
    .onAuthStateChanged(response  => {
      // pegando o resonse(que vai falar se o usuário está ou não autenticado)
      // e inserindo essa informação no estado user
      setUser(response);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  if(loading) {
    return <Loading />
  };

  return (
    <NavigationContainer>
      {
        /* 
          se o usuário existir e estiver logado vai ser exibido o AppRoutes senão
          vai ser exibido o SignIn
        */
      }
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
};