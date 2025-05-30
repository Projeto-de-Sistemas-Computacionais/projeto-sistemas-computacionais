import React, { useState } from 'react';
import { View, Text, TextInput, Linking, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones
import {Picker} from '@react-native-picker/picker';

export default function TelaCadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
    };

    const [confSenha, setConfSenha] = useState('');
    const [confSenhaVisivel, setConfSenhaVisivel] = useState(false);
    const alternarVisibilidadeConfSenha = () => {
        setConfSenhaVisivel(!confSenhaVisivel);
    }

    const [tipoConta, setTipoConta] = useState('');
    
    return(
        <ScrollView>
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
                    <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>
                      Crie uma conta
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View>
                        <Text style = {styles.label}>
                            Nome completo
                        </Text>
                        <TextInput 
                        style = {styles.input}
                        value = {nome}
                        onChangeText = {setNome}
                        /> 

                        <Text style = {styles.label}>
                            Endereço de email
                        </Text>
                        <TextInput 
                        style = {styles.input}
                        value = {email}
                        onChangeText = {setEmail}
                        />

                        <Text style = {styles.label}>
                            Senha
                        </Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
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

                        <Text style = {styles.label}>
                            Confirmar senha
                        </Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style = {styles.input}
                                secureTextEntry = {!confSenhaVisivel}
                                value = {confSenha}
                                onChangeText = {setConfSenha}
                            />
                            <TouchableOpacity onPress={alternarVisibilidadeConfSenha} style={styles.icon}>
                                <Ionicons
                                name = {confSenhaVisivel ? 'eye-off' : 'eye'}
                                size = {24}
                                color = "gray"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style = {styles.label}>
                            Tipo de conta
                        </Text>
                        <View style = {styles.pickerContainer}>
                            <Picker 
                                selectedValue = {tipoConta}
                                onValueChange = {(itemValue) => setTipoConta(itemValue)}
                                style = {styles.picker}
                            >
                                <Picker.Item label="Pessoa física" value="Pessoa física" />
                                <Picker.Item label="Pessoa jurídica" value="Pessoa jurídica" />
                            </Picker>
                        </View>

                        <View>
                            <TouchableOpacity
                            style={[styles.button, { width: '50%' }]}
                            onPress={() => alert('Login Realizado!')}
                            >
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>Cadastrar</Text>
                            </TouchableOpacity>

                            <Text
                            style={{ color: 'black', textAlign: 'center', marginTop: 8 }}
                            onPress={() => Linking.openURL('')}
                            >
                            Já tem uma conta? Entre na sua conta
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    formContainer: {
      marginTop: 20,
      backgroundColor: 'FFFCF5',
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
      marginTop: 58,
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 16,
    },
    picker:{
        height: 50,
        width: '100%',
    },
  });