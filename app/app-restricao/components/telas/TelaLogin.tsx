import React from 'react';
import { View, Text, TextInput, Button, Linking, TouchableOpacity } from 'react-native';

export default function TelaLogin() {
  return (
    <View>
      <View style={{ 
      backgroundColor: '#768E91', 
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

      <View style={{ flex: 1, padding: 16 }}>
      <Text style={{fontSize: 30}}>Entrar na conta</Text>
      <View/>

      <View style={{marginTop: 20,
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: 'gray',
      width: '100%',
      paddingTop: 50,
      }}>
      <Text style={{fontSize: 24, paddingBottom: 10}}>Endereço de email:</Text>
      <TextInput style={[styles.placeholder, { width: '100%'}]} placeholder='email@dominio.com' placeholderTextColor="black"></TextInput>
      <Text style={{fontSize: 24, paddingTop: 20, paddingBottom: 10}}>Senha:</Text>
      <TextInput style={[styles.placeholder, { width: '100%' }]} placeholder='********' placeholderTextColor='black'></TextInput>
      <Text style={{color: 'black', fontSize: 18}}
      onPress={() => Linking.openURL('')}>Esqueceu a senha?</Text>
      </View>

      <View>
        <TouchableOpacity style={[styles.button, { width: '50%' }]} onPress={() => alert('Login Realizado!')}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>Entrar</Text>
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
    backgroundColor: '#6CA08B',
    padding: 10,
    alignSelf: 'center',
    marginTop: 260,
},
  placeholder: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
}