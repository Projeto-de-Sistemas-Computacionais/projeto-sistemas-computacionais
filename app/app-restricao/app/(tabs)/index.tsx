
import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import TelaLogin from '@/components/telas/TelaLogin';
import TelaListagemRestaurantes from '@/components/telas/TelaListagemRestaurantes';
import DetalhamentoRestaurante from '@/components/telas/DetalhamentoRestaurante';
import TelaListarProdutos from '@/components/telas/TelaListarProdutos';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View>
       <DetalhamentoRestaurante/>
      </View>
    </ScrollView>
  );
}