import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import React from 'react';
import TelaCadastro from '../../components/telas/TelaCadastro';
import TelaCadastroReceita from '../../components/telas/TelaCadastroReceita';


export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <TelaCadastroReceita/>
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
