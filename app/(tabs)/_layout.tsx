import { Text } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e1e1e', // Fondo de la barra
          borderTopColor: '#333',     // Borde superior
          height: Platform.OS === 'ios' ? 75 : 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#00FFAA',  // Color activo
        tabBarInactiveTintColor: '#999999', // Color inactivo
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🔍</Text>,
        }}
      />
    </Tabs>
  );
}
