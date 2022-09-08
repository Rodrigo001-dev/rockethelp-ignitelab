import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description,
  // pelo footer ser opcional o valor inicial dele vai ser nulo
  footer = null,
  // pelo icon ser um componente e os componentes tem que ter a primeira letra
  // maiúscula ter que colocar dessa forma
  icon: Icon,
  children
}: Props) {
  const { colors } = useTheme();
  
  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={1} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>

      {
        // como a description é um valor string, para ela ser transformada em
        // um valor boleano é só colocar !!(para verificar se tem algum conteúdo
        // dentro)
        // && => então
        !!description && 
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      }

      { children }

      {
        !!footer &&
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      }
    </VStack>
  );
}