import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList } from 'native-base';
import { SignOut } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([{
    id: '1234',
    patrimony: '130948135',
    when: '18/07/2022 ás 10:00',
    status: 'open'
  }]);

  const { colors } = useTheme();

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
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Meus chamados
          </Heading>
          <Text color="gray.200">
            3
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

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} />}
        />
      </VStack>
    </VStack>
  );
}