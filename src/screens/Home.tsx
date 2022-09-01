import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { 
  HStack, 
  IconButton, 
  VStack, 
  useTheme, 
  Text, 
  Heading, 
  FlatList, 
  Center 
} from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoreDateFormat';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  };

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  };

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não possível sair.');
      })
    ;
  };

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
    // buscar pelas solicitações na collection orders
    .collection('orders')
    // fazendo um filtro onde o status seja igual ao status que está selecionado
    .where('status', '==', statusSelected)
    // o método onSnapshot vai atualizar os dados em tempo real
    .onSnapshot(snapshot => {
      // percorrendo cada um dos documentos retornados basiado no filtro na collection
      const data = snapshot.docs.map(doc => {
        const { patrimony, description, status, created_at } = doc.data();

        // formatando os dados de cada documento(doc)
        return {
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at)
        }
      });

      setOrders(data);
      setIsLoading(false);
    });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        {/* IconButton é um Button com um icone */}
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            // esse Filter vai estar ativo quando o statusSelected for igual a open
            isActive={statusSelected === 'open'}
          />

          <Filter
            type="closed"
            title="finalizado"
            onPress={() => setStatusSelected('closed')}
            // esse Filter vai estar ativo quando o statusSelected for igual a closed
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {
          isLoading ? <Loading /> :
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
            // showsVerticalScrollIndicator={false} é para desabilitar o barra de
            // rolagem que fica no canto direito na vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            // o ListEmptyComponent vai renderizar alguma coisa quando a lista
            // estiver vazia
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'}
                  solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizados'}
                </Text>
              </Center>
            )}
          />
        }

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}