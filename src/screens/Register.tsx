import { useState } from 'react';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos');
    };

    setIsLoading(true);

    // se a collection(orders) não existir no firestore no primeiro momento
    // ela vai ser criada
    firestore()
    .collection('orders')
    .add({
      // aqui dentro vem o conteúdo que eu quero adicionar
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Não foi possível registrar o pedido');
    });
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input 
        placeholder="Número do partimônio"
        mt={4}
      />

      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />

      <Button 
        title="Cadastrar"
        mt={5}
      />
    </VStack>
  );
}