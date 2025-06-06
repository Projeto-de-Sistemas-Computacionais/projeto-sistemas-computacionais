
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TelaMeuPerfil from '../../components/telas/TelaMeuPerfil'

export default function index() {
  return (
    <ScrollView>
      <View>
        <TelaMeuPerfil/>
      </View>
    </ScrollView>
  )
}