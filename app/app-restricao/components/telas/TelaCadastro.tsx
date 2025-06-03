import React, { useState } from 'react';
import { View, Text, TextInput, Linking, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones
import { Picker } from '@react-native-picker/picker';

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

    return (

        <View style={styles.tela}>
            <ScrollView>
                <View style={styles.menuSup}>
                    <Text style={styles.titulo}>
                        Crie uma conta
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>
                        Nome completo
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>
                        Endereço de email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>
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
                            <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>
                        Confirmar senha
                    </Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={!confSenhaVisivel}
                            value={confSenha}
                            onChangeText={setConfSenha}
                        />
                        <TouchableOpacity onPress={alternarVisibilidadeConfSenha} style={styles.icon}>
                            <Ionicons name={confSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>
                        Tipo de conta
                    </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={tipoConta}
                            onValueChange={(itemValue) => setTipoConta(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Pessoa física" value="Pessoa física" />
                            <Picker.Item label="Pessoa jurídica" value="Pessoa jurídica" />
                        </Picker>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.botaoText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <Text style={styles.texto}>
                            Já tem uma conta? Entre na sua conta
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    tela: {
        flex: 1,
    },
    menuSup: {
        backgroundColor: '#768E91',
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    titulo: {
        color: '#fff7e8',
        fontSize: 26,
    },
    formContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingTop: 10,
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
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#f1e0c5',
        borderRadius: 10,
        marginBottom: 16,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    botao: {
        marginTop: 20,
        backgroundColor: '#6CA08B',
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    botaoText: {
        color: '#fff',
        fontSize: 20,
    },
    texto: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 8,
    },
});