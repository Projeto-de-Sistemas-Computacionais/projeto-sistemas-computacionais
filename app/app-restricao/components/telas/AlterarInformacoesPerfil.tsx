import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AlterarInformacoesPerfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confSenha, setConfSenha] = useState('');
  const [confSenhaVisivel, setConfSenhaVisivel] = useState(false);

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
            <Text style={styles.headerText}>Alteração de informações</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Sobrenome"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Endereço de email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.icon}>
                <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry={!confSenhaVisivel}
                value={confSenha}
                onChangeText={setConfSenha}
              />
              <TouchableOpacity onPress={() => setConfSenhaVisivel(!confSenhaVisivel)} style={styles.icon}>
                <Ionicons name={confSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSave]}
          onPress={() => { Keyboard.dismiss(); alert('Alterações salvas!'); }}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

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
