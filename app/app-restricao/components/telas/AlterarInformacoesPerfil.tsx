import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Keyboard, Platform, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Restricao = { id?: number; nome: string };

export default function AlterarInformacoesPerfil() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [restricoes, setRestricoes] = useState<Restricao[]>([]);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

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

        const id = response.data.id;

        const dadosCompletos = await axios.get(`http://localhost:8080/usuarios/${id}`, {
          headers: { 'login-token': token },
        });

        const { nomeCompleto, email, restricoes } = dadosCompletos.data;
        setIdUsuario(id);
        setNome(nomeCompleto);
        setEmail(email);
        setRestricoes(restricoes || []);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error?.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário. Faça login novamente.');
        navigation.navigate('TelaLogin');
      }
    }

    buscarDadosUsuario();
  }, []);

  function emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSalvarAlteracoes = async () => {
      if (!nome.trim() || !email.trim()) {
        Alert.alert('Campos obrigatórios', 'Nome e email não podem ficar em branco.');
        return;
      }

        if (!emailValido(email)) {
          Alert.alert('Email inválido', 'Informe um endereço de email válido.');
          return;
        }

    if (!senhaAtual) {
      Keyboard.dismiss();
      setTimeout(() => {
        Alert.alert('Informe sua senha para confirmar as alterações.');
      }, 300);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');

      const payload = {
        nomeCompleto: nome,
        email: email,
        senha: senhaAtual,
        restricoes: restricoes.filter(r => r.nome.trim() !== '')
      };

      await axios.put(`http://localhost:8080/usuarios/${idUsuario}`, payload, {
        headers: { 'login-token': token },
      });
      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      navigation.navigate('TelaMeuPerfil');
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      Alert.alert('Erro', 'Não foi possível atualizar as informações. Verifique sua senha.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={paraTelaMeuPerfil}>
              <Ionicons name="arrow-back" size={24} color={'#fff7e8'} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Alteração de informações</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome}/>

            <Text style={styles.label}>Endereço de email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.label}>Restrições</Text>
            {restricoes.map((r, index) => (
              <View key={index} style={styles.restrictionItem}>
                <TextInput
                  style={[styles.input,  { flex: 1 }]}
                  value={r.nome}
                  onChangeText={(text) => {
                    const novas = [...restricoes];
                    novas[index].nome = text;
                    setRestricoes(novas);
                  }}
                />
                <TouchableOpacity onPress={() => {
                  const novas = restricoes.filter((_, i) => i !== index);
                  setRestricoes(novas);
                }}>
                  <Ionicons name="trash-outline" size={20} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              disabled={restricoes.length > 0 && restricoes[restricoes.length - 1].nome.trim() === ''}
              onPress={() => setRestricoes([...restricoes, { nome: '' }])}
            >
              <Text style={{ color: '#6CA08B', marginVertical: 10 }}>+ Adicionar restrição</Text>
            </TouchableOpacity>


            <Text style={styles.label}>Insira sua senha para confirmar as alterações</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={!senhaVisivel}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.icon}>
                <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSalvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF5',
  },
  header: {
    backgroundColor: '#768E91',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 200,
    width: '100%',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 30,
    color: '#FFFCF5',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFCF5',
    paddingTop: 50,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5dcd0',
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
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  restrictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonSave: {
    backgroundColor: '#6CA08B',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFCF5',
  },
});
