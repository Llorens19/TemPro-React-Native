import React, { JSX, useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import BackgroundTimer from 'react-native-background-timer';

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return (
    [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":") + `.${milliseconds.toString().padStart(2, "0")}`
  );
};

const Crono = (): JSX.Element => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [flags, setFlags] = useState<number[]>([]);

  useEffect(() => {
    if (isRunning) {
      // Usa BackgroundTimer en lugar de setInterval normal
      intervalRef.current = BackgroundTimer.setInterval(() => {
        setElapsedMs(prev => prev + 10);
      }, 10);
    } else if (!isRunning && intervalRef.current !== null) {
      BackgroundTimer.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        BackgroundTimer.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = (): void => setIsRunning(true);
  const handlePause = (): void => setIsRunning(false);
  const handleReset = (): void => {
    setIsRunning(false);
    setElapsedMs(0);
    setFlags([]);
  };
  const handleFlag = (): void => {
    if (isRunning) setFlags([...flags, elapsedMs]);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.time}>{formatTime(elapsedMs)}</Text>
        <View style={styles.buttons}>
          {!isRunning ? (
            <Button
              title={elapsedMs > 0 ? "Reanudar" : "Iniciar"}
              onPress={handleStart}
            />
          ) : (
            <Button title="Pausar" onPress={handlePause} />
          )}
          <Button title="Reiniciar" onPress={handleReset} />
          <Button title="Guardar" onPress={handleFlag} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.flagsContainer}>
        {flags.map((flag, index) => (
          <Text key={index} style={styles.time}>
            {formatTime(flag)}
          </Text>
        ))}
      </ScrollView>
    </>
  );
};

export default Crono;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  time: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  flagsContainer: {
    alignItems: "center",
  },
});
