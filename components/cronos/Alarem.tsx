import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';

// Configura cómo se manejarán las notificaciones cuando la app esté en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Mostrar alerta
    shouldPlaySound: true, // Reproducir sonido (se usará el sonido de la notificación)
    shouldSetBadge: false, // No mostrar insignia
  }),
});

export default function App() {
  const [alarmTime, setAlarmTime] = useState(null); // Aquí almacenaríamos la hora de la alarma
  const soundObject = useRef(new Audio.Sound()); // Referencia para el objeto de sonido
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false); // Estado para saber si la alarma está sonando

  // Pide permisos de notificación cuando el componente se monta
  useEffect(() => {
    registerForPushNotificationsAsync();
    // Limpia el objeto de sonido cuando el componente se desmonta
    return () => {
      if (soundObject.current) {
        soundObject.current.unloadAsync();
      }
    };
  }, []);

  // Función para pedir los permisos de notificación
  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      // Para Android, puedes necesitar establecer un canal de notificación
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX, // Importancia máxima para que suene fuerte
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'alarm.mp3', // Referencia al sonido en tu assets folder
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Permiso de notificaciones', 'Necesitamos tu permiso para enviar notificaciones de alarma.');
      return false;
    }
    return true;
  }

  // Función para programar la alarma
  const scheduleAlarm = async () => {
    // En un caso real, aquí tendrías un selector de hora y la lógica para calcular el tiempo
    // Por simplicidad, programaremos una alarma para 5 segundos en el futuro para probar
    const trigger = new Date(Date.now() + 5 * 1000); // 5 segundos desde ahora
    setAlarmTime(trigger.toLocaleTimeString());

    // Cancelar cualquier notificación programada previamente para evitar duplicados
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Programar la notificación
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Alarma!",
        body: "Es hora de despertar.",
        sound: 'alarm.mp3', // Usará el sonido que especificamos en el canal de Android/en app.json para iOS
      },
      trigger: {
        // Puedes usar una fecha exacta para el trigger
        date: trigger,
        repeats: false // Para una alarma única, si quieres que se repita, sería true
      },
      identifier: 'alarm-notification', // Un identificador para esta notificación
    });

    Alert.alert('Alarma Programada', `La alarma sonará en 5 segundos.`);
  };

  // Función que se ejecuta cuando la notificación de alarma es recibida
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
      // Si la alarma se activa mientras la app está en primer plano
      if (notification.request.identifier === 'alarm-notification' && !isAlarmPlaying) {
         startAlarmSound();
      }
    });

    // Este listener se dispara cuando el usuario interactúa con la notificación
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
      if (response.notification.request.identifier === 'alarm-notification') {
        stopAlarmSound(); // Detener la alarma cuando el usuario la toca
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(subscription);
      Notifications.removeNotificationSubscription(responseSubscription);
    };
  }, [isAlarmPlaying]);


  // Función para reproducir el sonido de la alarma directamente
  const startAlarmSound = async () => {
    try {
      // Configura las políticas de audio para que funcione en segundo plano
      await Audio.setAudioModeAsync({
        allowsRecording: false,
        playsInSilentModeIOS: true, // Esto es clave para iOS
        staysActiveInBackground: true, // Esto es clave para Android
        shouldDuckAndroid: false, // No bajar volumen de otras apps
        playThroughEarpieceAndroid: false,
      });

      // Carga el sonido
      await soundObject.current.loadAsync(require('./assets/alarm.mp3'));
      // Loop el sonido indefinidamente
      await soundObject.current.setIsLoopingAsync(true);
      // Reproduce el sonido
      await soundObject.current.playAsync();
      setIsAlarmPlaying(true);
      console.log('Alarma sonando...');
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
      Alert.alert('Error', 'No se pudo reproducir el sonido de la alarma.');
    }
  };

  // Función para detener el sonido de la alarma
  const stopAlarmSound = async () => {
    try {
      if (soundObject.current) {
        await soundObject.current.stopAsync();
        await soundObject.current.unloadAsync();
        setIsAlarmPlaying(false);
        console.log('Alarma detenida.');
      }
    } catch (error) {
      console.error('Error al detener el sonido:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarma de Prueba</Text>
      {alarmTime && <Text style={styles.alarmText}>Alarma programada para: {alarmTime}</Text>}
      <Button title="Programar Alarma (5s)" onPress={scheduleAlarm} disabled={isAlarmPlaying} />
      {isAlarmPlaying && <Button title="Detener Alarma" onPress={stopAlarmSound} color="red" />}
      <Text style={styles.info}>
        Para probar con el teléfono bloqueado:
      </Text>
      <Text style={styles.info}>
        1. Programa la alarma.
      </Text>
      <Text style={styles.info}>
        2. Bloquea tu teléfono.
      </Text>
      <Text style={styles.info}>
        3. Espera 5 segundos y el sonido debería reproducirse.
      </Text>
      <Text style={styles.info}>
        4. Toca la notificación para detenerla.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alarmText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'blue',
  },
  info: {
    marginTop: 10,
    textAlign: 'center',
    color: 'gray',
  }
});