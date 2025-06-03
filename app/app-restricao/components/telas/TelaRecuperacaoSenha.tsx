import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TelaCadastroReceita() {
    const [enderecoEmail, setEnderecoEmail] = useState('');

    return (
        <View style={styles.tela}>

            <View style={styles.menuSup}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color={'#fff7e8'} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Redefina sua senha</Text>
            </View>

            <ScrollView>
                <View style={styles.formContainer}>

                    <Text style={styles.texto}>
                        Esqueceu sua senha? Digite seu email abaixo:
                    </Text>

                    <Text style={styles.label}>
                        Endereço de Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={enderecoEmail}
                        onChangeText={setEnderecoEmail}
                    />

                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.botaoText}>Enviar</Text>
                    </TouchableOpacity>

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
    texto: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 70,
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