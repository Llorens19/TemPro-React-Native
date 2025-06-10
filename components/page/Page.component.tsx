import { View, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren<{}>) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
