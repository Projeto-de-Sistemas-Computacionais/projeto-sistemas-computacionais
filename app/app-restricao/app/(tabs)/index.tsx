import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import React from 'react';
import TelaLogin from '@/components/telas/TelaLogin';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <TelaLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
