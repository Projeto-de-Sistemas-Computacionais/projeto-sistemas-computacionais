import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TelaRedefinirSenha() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }

  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
  const alternarVisibilidadeSenhaAtual = () => { setSenhaAtualVisivel(!senhaAtualVisivel); };

  const [novaSenha, setNovaSenha] = useState('');
  const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
  const alternarVisibilidadeNovaSenha = () => { setNovaSenhaVisivel(!novaSenhaVisivel); };
  
  const [confNovaSenha, setConfNovaSenha] = useState('');
  const [confNovaSenhaVisivel, setConfNovaSenhaVisivel] = useState(false);
  const alternarVisibilidadeConfNovaSenha = () => { setConfNovaSenhaVisivel(!confNovaSenhaVisivel); }

  useEffect(() => {
    async function buscarDadosUsuario() {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
            navigation.navigate('TelaLogin');
            return;
        }

        const response = await axios.get('http://localhost:8080/usuarios/logado', {
          headers: { 'login-token': token },
        });

        setIdUsuario(response.data.id);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error?.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário. Faça login novamente.');
        navigation.navigate('TelaLogin');
      }
    }

    buscarDadosUsuario();
  }, []);

   const handleSalvarAlteracao = async () => {
      if (!senhaAtual.trim() || !novaSenha.trim() || !confNovaSenha) {
        Alert.alert('Campos obrigatórios', 'Todos os campos devem ser preenchidos.');
        return;
      }

      if (novaSenha != confNovaSenha) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }

      if (novaSenha === senhaAtual) {
        Alert.alert('Erro', 'A nova senha deve ser diferente da atual.');
        return;
      }

      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) throw new Error('Sessão expirada');

        const payload = {
          senhaAtual,
          novaSenha
        };


        await axios.put(`http://localhost:8080/usuarios/${idUsuario}/senha`, payload, {
          headers: { 'login-token': token },
        });

        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigation.navigate('TelaMeuPerfil');

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', error.response?.data || 'Não foi possível alterar a senha.');
    }
  };

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
          <View style={styles.senhaContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!senhaAtualVisivel}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />
            <TouchableOpacity onPress={alternarVisibilidadeSenhaAtual} style={styles.icon}>
              <Ionicons name={senhaAtualVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

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
        <TouchableOpacity style={styles.botao} onPress={handleSalvarAlteracao}>
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