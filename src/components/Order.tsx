import { 
  Box, 
  Circle, 
  HStack, 
  Text, 
  useTheme, 
  VStack, 
  Pressable,
  IPressableProps
} from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

// esse tipo(OrderProps) vai ser exportado para poder ser utilizado em outros
// lugares
export type OrderProps = {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
};

// esse tipo(Props) vai ser utilizado no componente somente
type Props = IPressableProps & {
  data: OrderProps;
};

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={12}>
          {
            // se o data.status for igual a closed eu vou renderizar o CircleWavyCheck
            // se não eu vou renderizar o Hourglass
            data.status === 'closed'
            ? <CircleWavyCheck size={24} color={statusColor} />
            : <Hourglass size={24} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}