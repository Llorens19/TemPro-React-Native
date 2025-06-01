import { Hola } from '@Hola';
import { StatusBar } from 'expo-status-bar';
import { JSX } from 'react';
import { View } from 'react-native';

export const App = () : JSX.Element => (
  <View className= "bg-gray-500">
    <Hola/>
    <StatusBar style="auto" />
  </View>
);