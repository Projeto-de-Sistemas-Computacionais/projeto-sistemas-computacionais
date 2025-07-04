import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function TelaCadastroReceita() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }

  const [senhaAtual, setSenhaAtual] = useState('');

  const [novaSenha, setNovaSenha] = useState('');
  const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
  const alternarVisibilidadeNovaSenha = () => {
    setNovaSenhaVisivel(!novaSenhaVisivel);
  };

  const [confNovaSenha, setConfNovaSenha] = useState('');
  const [confNovaSenhaVisivel, setConfNovaSenhaVisivel] = useState(false);
  const alternarVisibilidadeConfNovaSenha = () => {
    setConfNovaSenhaVisivel(!confNovaSenhaVisivel);
  }

  const validacaoSenha = () => {
    if (novaSenha != confNovaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
  }

  return (
    <View style={styles.tela}>

      <View style={styles.menuSup}>
        <TouchableOpacity onPress={paraTelaMeuPerfil}>
          <Ionicons name="arrow-back" size={24} color={'#fff7e8'} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Alteração de senha</Text>
      </View>

      <ScrollView>
        <View style={styles.formContainer}>

          <Text style={styles.label}>
            Senha atual
          </Text>
          <TextInput
            style={styles.input}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
          />

          <Text style={styles.label}>
            Nova senha
          </Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!novaSenhaVisivel}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity onPress={alternarVisibilidadeNovaSenha} style={styles.icon}>
              <Ionicons name={novaSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>
            Confirmar senha
          </Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!confNovaSenhaVisivel}
              value={confNovaSenha}
              onChangeText={setConfNovaSenha}
            />
            <TouchableOpacity onPress={alternarVisibilidadeConfNovaSenha} style={styles.icon}>
              <Ionicons name={confNovaSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <View style={styles.contBotao}>
        <TouchableOpacity style={styles.botao} onPress={validacaoSenha}>
          <Text style={styles.botaoText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  menuSup: {
    backgroundColor: '#768E91',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titulo: {
    color: '#fff7e8',
    fontSize: 26,
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 19,
    paddingTop: 16,
  },
  label: {
    paddingTop: 15,
    fontSize: 20,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    borderColor: '#f1e0c5',
  },
  senhaContainer: {
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
  contBotao: {
    paddingHorizontal: 20,
  },
  botao: {
    marginTop: 80,
    backgroundColor: '#6CA08B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoText: {
    color: '#fff',
    fontSize: 20,
  },
});