import { JSX } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { HorizontalMenuBar } from '@/components/MenuBars/HorizontalMenuBar.component';
import { View, StyleSheet } from 'react-native';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};
const Layout = (): JSX.Element => (
  <PaperProvider theme={theme} >
    <StatusBar style="light" />
    <SafeAreaView style={styles.container} className='bg-black'>
      <View style={styles.content} >
        <Slot />
      </View>
      <HorizontalMenuBar />
    </SafeAreaView>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Layout;