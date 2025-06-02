import React, { useState } from 'react';
import { View, Text, TextInput, Linking, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TelaCadastroReceita() {
    const [nomeReceita, setNomeReceita] = useState('');
    const [duracao, setDuracao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [passos, setPassos] = useState('');

    const [ingrediente, setIngrediente] = useState('');
    const [listaIngredientes, setListaIngredientes] = useState([]);

    const adicionarIngrediente = () => {
        if (ingrediente.trim() !== '') {
            setListaIngredientes([...listaIngredientes, ingrediente]);
            setIngrediente('');
        }
    };

    const [restricao, setRestricao] = useState('');
    const [listaRestricoes, setListaRestricoes] = useState([]);

    const adicionarRestricao = () => {
        if (restricao.trim() !== '') {
            setListaRestricoes([...listaRestricoes, restricao]);
            setRestricao('');
        }
    }

    return (
        <View style={styles.tela}>

            <View style={styles.menuSup}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Nova receita</Text>
            </View>

            <ScrollView>
                <View style={styles.formContainer}>

                    <Text style={styles.label}>
                        Nome da receita*
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={nomeReceita}
                        onChangeText={setNomeReceita}
                        placeholder="Nome"
                    />

                    <Text style={styles.label}>
                        Tempo de duração (minutos)*
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={duracao}
                        onChangeText={setDuracao}
                        placeholder="Ex: 30"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>
                        DESCRIÇÃO*
                    </Text>
                    <TextInput
                        style={styles.inputMaior}
                        value={descricao}
                        onChangeText={setDescricao}
                        placeholder="Descreva sua receita"
                    />

                    <Text style={styles.label}>
                        PASSO A PASSO*
                    </Text>
                    <TextInput
                        style={styles.inputMaior}
                        value={passos}
                        onChangeText={setPassos}
                        placeholder="Escreva o passo a passo de sua receita"
                    />

                    <View style={styles.linha} />

                    <Text style={styles.label}>
                        INGREDIENTES*
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputMenor}
                            value={ingrediente}
                            onChangeText={setIngrediente}
                            placeholder="Nome e quantidade do ingrediente"
                        />
                        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarIngrediente}>
                            <Ionicons name="add-circle-outline" size={24} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={listaIngredientes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text style={styles.itemI}>• {item}</Text>}
                    />

                    <Text style={styles.label}>
                        RESTRIÇÕES*
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputMenor}
                            value={restricao}
                            onChangeText={setRestricao}
                            placeholder="Ex: Intolerância a lactose"
                        />
                        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarRestricao}>
                            <Ionicons name="add-circle-outline" size={24} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={listaRestricoes}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => <Text style={styles.itemR}>{item}</Text>}
                    />

                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.botaoText}>CRIAR</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <View style={styles.menuInferior}>
                <TouchableOpacity>
                    <Ionicons name="home-outline" size={24} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="location-outline" size={24} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="add-circle-outline" size={24} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={24} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="person-outline" size={24} />
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
        color: 'black',
        fontSize: 26,
        marginTop: 20,
    },
    formContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
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
    inputMaior: {
        borderWidth: 2,
        borderRadius: 10,
        paddingBottom: 25,
        paddingHorizontal: 15,
        borderColor: '#f1e0c5',
        color: 'cdb49e',
    },
    linha: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    inputMenor: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#f1e0c5',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },
    botaoAdicionar: {
    },
    itemI: {
        color: '#3d3d3d',
        marginBottom: 6,
        paddingLeft: 6,
    },
    itemR: {
        backgroundColor: '#f4e3c3',
        color: '#3d3d3d',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginBottom: 6,
        alignSelf: 'flex-start',
    },
    menuInferior: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fef7e9',
    },
    botao: {
        marginTop: 25,
        backgroundColor: '#0066CC',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    botaoText: {
        color: '#fff',
        fontSize: 16,
    },
});