import { HStack, Text } from 'native-base';

// esse tipo(OrderProps) vai ser exportado para poder ser utilizado em outros
// lugares
export type OrderProps = {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
};

// esse tipo(Props) vai ser utilizado no componente somente
type Props = {
  data: OrderProps;
};

export function Order({ data, ...rest }: Props) {
  return (
    <HStack>
      <Text color="white" fontSize="md">
        Patrimônio {data.patrimony}
      </Text>
    </HStack>
  );
}