import { Text, View } from 'react-native';
import React from 'react';
import TelaLogin from '@/components/telas/TelaLogin';
import TelaListagemRestaurantes from '@/components/telas/TelaListagemRestaurantes';

export default function HomeScreen() {
  return (
    <View>
      <TelaListagemRestaurantes/>
    </View>
  );
}