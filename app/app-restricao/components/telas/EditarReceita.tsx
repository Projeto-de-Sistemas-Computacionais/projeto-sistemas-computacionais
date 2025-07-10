import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuInferior from '../ui/MenuInferior';
import { Colors } from '../../constants/Colors';

export default function EditarReceita() {
  const { width } = Dimensions.get('window');

  const [nomeReceita, setNomeReceita] = useState('Nome da receita');
  const [descricao, setDescricao] = useState('Descrição do autor');
  const [passos, setPassos] = useState('Passo a passo da receita');
  const [ingredientes, setIngredientes] = useState([
    '3 xícaras de açúcar',
    '3 ovos',
  ]);

  const [restricaoAtual, setRestricaoAtual] = useState('');
  const [restricoes, setRestricoes] = useState([]);

  const adicionarRestricao = () => {
    if (restricaoAtual.trim() !== '') {
      setRestricoes([...restricoes, restricaoAtual.trim()]);
      setRestricaoAtual('');
    }
  };

  const adicionarIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Ionicons name="arrow-back-outline" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="checkmark-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputTitulo}>{nomeReceita}</Text>
          </View>

          <View style={styles.secaoInicial}>
            <Text style={styles.secaoTitulo}>Nome da receita *</Text>
            <TextInput
              style={styles.inputStyle}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Nome da receita"
            />

            <Text style={styles.secaoTitulo}>Tempo de duração *</Text>
            <TextInput
              style={styles.inputStyle}
              value={passos}
              onChangeText={setPassos}
              placeholder="Tempo de duração da receita"
            />
          </View>

          <View style={styles.avaliacoes}>
            <Text style={styles.secaoTitulo}>DESCRIÇÃO *</Text>
            <TextInput
              style={styles.inputMultilinha}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva sua receita"
              multiline
            />

            <Text style={styles.secaoTitulo}>PASSO A PASSO *</Text>
            <TextInput
              style={styles.inputMultilinha}
              value={passos}
              onChangeText={setPassos}
              placeholder="Explique o modo de preparo"
              multiline
            />

            <Text style={styles.secaoTitulo}>INGREDIENTES *</Text>
            {ingredientes.map((item, index) => (
              <TextInput
                key={index}
                style={styles.inputStyle}
                value={item}
                onChangeText={(text) => {
                  const novaLista = [...ingredientes];
                  novaLista[index] = text;
                  setIngredientes(novaLista);
                }}
                placeholder={`Ingrediente ${index + 1}`}
              />
            ))}

            <TouchableOpacity onPress={adicionarIngrediente} style={styles.botaoAddIngrediente}>
              <Ionicons name="add" size={20} color="#CDB49E" />
              <Text style={styles.textoAddIngrediente}>Adicionar ingrediente</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
              {ingredientes.map((item, index) => (
                <Text key={index} style={styles.bulletText}>
                  • {item}
                </Text>
              ))}
            </View>

            <Text style={styles.secaoTitulo}>RESTRIÇÕES</Text>
            <View style={styles.restricaoInputWrapper}>
              <TextInput
                style={[styles.inputStyle, { flex: 1, marginBottom: 0 }]}
                value={restricaoAtual}
                onChangeText={setRestricaoAtual}
                placeholder="Digite uma restrição"
              />
              <TouchableOpacity onPress={adicionarRestricao} style={styles.botaoAdd}>
                <Ionicons name="add" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsWrapper}>
              {restricoes.map((restricao, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{restricao}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoSalvar}>
              <Text style={styles.textoBotao}>confirmar edição</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <MenuInferior />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: Colors.darkGreen,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 200,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputTitulo: {
    textAlign: 'center',
    fontSize: 28,
    color: Colors.white,
    fontWeight: 'bold',
  },
  avaliacoes: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  secaoInicial: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 8,
  },
  inputMultilinha: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: "#CDB49E",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    lineHeight: 22,
    color: 'black',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#CDB49E",
    padding: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  bulletText: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
    paddingVertical: 2,
  },
  restricaoInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  botaoAdd: {
    backgroundColor: '#FFF7E8',
    padding: 10,
    borderRadius: 30,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FFF7E8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: "#CDB49E",
  },
  botaoWrapper: {
    alignItems: 'center',
    paddingTop: 30,
    marginHorizontal: 20,
  },
  botaoSalvar: {
    backgroundColor: "#216AC1",
    borderRadius: 20,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
  botaoAddIngrediente: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  textoAddIngrediente: {
    fontSize: 16,
    color: '#CDB49E',
    fontWeight: '500',
  },
});
