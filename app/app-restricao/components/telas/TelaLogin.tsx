import React, { useState } from 'react';
import { View, Text, TextInput, Linking, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function TelaLogin() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaRecuperacaoSenha() {
    navigation.navigate("TelaRecuperacaoSenha");
  }

  async function paraTelaCadastro() {
    navigation.navigate("TelaCadastro");
  }

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');

  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: '#768E91',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 40,
        paddingHorizontal: 100,
        alignItems: 'center',
        width: '100%',
      }}>
        <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>
          Bem vindo(a) ao (nome aqui)!
        </Text>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 30 }}>Entrar na conta</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Endereço de email:</Text>
          <TextInput
            style={[styles.input]}
            placeholder='email@dominio.com'
            placeholderTextColor="black"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder='********'
              placeholderTextColor="black"
              secureTextEntry={!senhaVisivel}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={alternarVisibilidadeSenha} style={styles.icon}>
              <Ionicons
                name={senhaVisivel ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{ color: 'black', fontSize: 18, marginTop: 10 }}
            onPress={paraTelaRecuperacaoSenha}
          >
            Esqueceu a senha?
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.button, { width: '50%' }]}
            onPress={() => alert('Login Realizado!')}
          >
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Entrar</Text>
          </TouchableOpacity>

          <Text
            style={{ color: 'black', textAlign: 'center', marginTop: 8 }}
            onPress={paraTelaCadastro}
          >
            Não tem uma conta? Crie a sua
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'gray',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 24,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    paddingRight: 40, // espaço para o ícone
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'black',
    borderRadius: 5,
    backgroundColor: '#6CA08B',
    padding: 10,
    alignSelf: 'center',
    marginTop: 210,
  },
});
