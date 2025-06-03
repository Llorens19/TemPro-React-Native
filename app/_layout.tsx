import { JSX } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};
const Layout = () : JSX.Element => (
  <PaperProvider theme={theme}>
    <StatusBar style="dark" />
    <SafeAreaView>
      <Slot/>
    </SafeAreaView>
  </PaperProvider>
);

export default Layout;