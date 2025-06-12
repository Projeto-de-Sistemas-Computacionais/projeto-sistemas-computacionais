
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TelaInicial from '../../components/telas/TelaInicial'

export default function index() {
  return (
    <ScrollView>
      <View>
        <TelaInicial/>
      </View>
    </ScrollView>
  )
}