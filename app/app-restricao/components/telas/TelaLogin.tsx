import React from 'react';
import { View, Text, TextInput, Button, Linking, TouchableOpacity } from 'react-native';

export default function TelaLogin() {
  return (
    <View>
      <View style={{ 
      backgroundColor: 'gray', 
      borderBottomLeftRadius: 15, 
      borderBottomRightRadius: 15, 
      paddingVertical: 40,
      paddingHorizontal: 100,
      alignItems: 'center',
      width: '100%',
      }}>
      <Text style={{ fontSize: 32, color: 'black', textAlign: 'left', margin: 0, padding: 0 }}>
      Bem vindo(a) ao (nome aqui)!
      </Text>
      </View>

      <View style={{ flex: 1, width: '100%', padding: 16 }}>
      <Text style={{fontSize: 30}}>Entrar na conta</Text>

      <View style={{ flex: 1, width: '100%', paddingTop: 80, gap: 8 }}>
      <Text style={{fontSize: 24}}>Endereço de email:</Text>
      <TextInput style={[styles.placeholder, { width: '100%' }]} placeholder='email@dominio.com' placeholderTextColor="black"></TextInput>
      <Text style={{fontSize: 24}}>Senha:</Text>
      <TextInput style={[styles.placeholder, { width: '100%' }]} placeholder='********' placeholderTextColor='black'></TextInput>
      <Text style={{color: 'black', fontSize: 18}}
      onPress={() => Linking.openURL('')}>Esqueceu a senha?</Text>
      </View>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 16 }}>
        <TouchableOpacity style={[styles.button, { width: '80%' }]} onPress={() => alert('Botão pressionado')}>
          <Text style={{ textAlign: 'center' }}>Entrar</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', textAlign: 'center', marginTop: 8 }}
          onPress={() => Linking.openURL('')}>Não tem uma conta? Crie a sua</Text>
      </View>

      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    color: 'black',
    borderRadius: 5,
    backgroundColor: 'gray',
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
  placeholder: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 3
  }
}