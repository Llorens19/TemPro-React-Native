import { JSX } from 'react';
import { TextInput, View } from 'react-native';

export const App = () : JSX.Element => (
  <View className= "bg-gray-500">
    <TextInput
      placeholder="Type something"
    />
  </View>
);
