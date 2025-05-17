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
});
