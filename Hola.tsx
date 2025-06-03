import { useRouter } from 'expo-router';
import { JSX } from 'react';
import { Button, View } from 'react-native';

export const Hola = () : JSX.Element => {
  const router = useRouter();
  return <View>
    <Button title="Ir al perfil" onPress={() => router.push('/about')} />
  </View>;
};