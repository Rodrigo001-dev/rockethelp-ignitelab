import { Text, Button, IButtonProps, useTheme } from 'native-base';

type Props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
}

export function Filter({ title, isActive = false, type, ...rest }: Props) {
  const { colors } = useTheme();
  
  // se o type for igual a open vai ter a cor secondary se não vai ter a cor green
  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300];
  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      {
        /*
          se estiver ativo vai ser passado o valor do colorType se não a cor vai
          ser a gray.300
        */
      }
      <Text color={isActive ? colorType : "gray.300"} fontSize="xm" textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
}