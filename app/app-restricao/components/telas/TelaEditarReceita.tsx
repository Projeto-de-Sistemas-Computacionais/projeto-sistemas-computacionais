import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuInferior from "../ui/MenuInferior";

export default function TelaEditarReceita() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const { id } = route.params;

  const [nomeReceita, setNomeReceita] = useState("");
  const [duracao, setDuracao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [passos, setPassos] = useState("");
  const [ingrediente, setIngrediente] = useState("");
  const [listaIngredientes, setListaIngredientes] = useState<string[]>([]);
  const [restricao, setRestricao] = useState("");
  const [listaRestricoes, setListaRestricoes] = useState<string[]>([]);

  useEffect(() => {
    const carregarReceita = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const res = await axios.get(`http://localhost:8080/receitas/${id}`, {
        headers: { "Login-Token": token },
      });

      const r = res.data;
      setNomeReceita(r.titulo);
      setDuracao(r.tempoPreparo.toString());
      setDescricao(r.descricao);
      setPassos(r.modoPreparo);
      setListaIngredientes(r.ingredientes.map((i) => i.descricao));
      setListaRestricoes(r.restricoes.map((r) => r.nome));
    };

    carregarReceita();
  }, [id]);

  const adicionarIngrediente = () => {
    if (ingrediente.trim() !== "") {
      setListaIngredientes([...listaIngredientes, ingrediente]);
      setIngrediente("");
    }
  };

  const adicionarRestricao = () => {
    if (restricao.trim() !== "") {
      setListaRestricoes([...listaRestricoes, restricao]);
      setRestricao("");
    }
  };

  const removerIngrediente = (index: number) => {
    const novaLista = [...listaIngredientes];
    novaLista.splice(index, 1);
    setListaIngredientes(novaLista);
  };

  const removerRestricao = (index: number) => {
    const novaLista = [...listaRestricoes];
    novaLista.splice(index, 1);
    setListaRestricoes(novaLista);
  };

  async function salvarReceita() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        alert("Você precisa estar logado para cadastrar uma receita.");
        navigation.navigate("TelaLogin");
        return;
      }

      if (
        !nomeReceita ||
        !duracao ||
        !descricao ||
        !passos ||
        listaIngredientes.length === 0
      ) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      const novaReceita = {
        titulo: nomeReceita,
        tempoPreparo: parseInt(duracao),
        descricao: descricao,
        modoPreparo: passos,
        ingredientes: listaIngredientes.map((desc) => ({ descricao: desc })),
        restricoes: listaRestricoes.map((nome) => ({ nome: nome })),
      };

      await axios.put(`http://localhost:8080/receitas/${id}`, novaReceita, {
        headers: { "Login-Token": token },
      });

      alert("Receita editada com sucesso!");
      navigation.navigate("TelaListarReceitas");
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      alert("Erro ao salvar receita. Tente novamente.");
    }
  }

  return (
    <View style={styles.tela}>
      <View style={styles.menuSup}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TelaListarReceitas")}
        >
          <Ionicons name='arrow-back' size={24} color={"#fff7e8"} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Editar receita</Text>
      </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da receita*</Text>
          <TextInput
            style={styles.input}
            value={nomeReceita}
            onChangeText={setNomeReceita}
            placeholder='Nome'
          />

          <Text style={styles.label}>Tempo de duração (minutos)*</Text>
          <TextInput
            style={styles.input}
            value={duracao}
            onChangeText={setDuracao}
            placeholder='Ex: 30'
            keyboardType='numeric'
          />

          <Text style={styles.label}>DESCRIÇÃO*</Text>
          <TextInput
            style={styles.inputMaior}
            value={descricao}
            onChangeText={setDescricao}
            placeholder='Descreva sua receita'
            multiline
          />

          <Text style={styles.label}>PASSO A PASSO*</Text>
          <TextInput
            style={styles.inputMaior}
            value={passos}
            onChangeText={setPassos}
            placeholder='Escreva o passo a passo de sua receita'
            multiline
          />

          <View style={styles.linha} />

          <Text style={styles.label}>INGREDIENTES*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputMenor}
              value={ingrediente}
              onChangeText={setIngrediente}
              placeholder='Nome e quantidade do ingrediente'
            />
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={adicionarIngrediente}
            >
              <Ionicons name='add-circle-outline' size={24} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={listaIngredientes}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.itemRemovivel}>
                <Text style={styles.itemI}>• {item}</Text>
                <TouchableOpacity onPress={() => removerIngrediente(index)}>
                  <Ionicons name='trash-outline' size={20} color='red' />
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.label}>RESTRIÇÕES*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputMenor}
              value={restricao}
              onChangeText={setRestricao}
              placeholder='Ex: Intolerância à lactose'
            />
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={adicionarRestricao}
            >
              <Ionicons name='add-circle-outline' size={24} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={listaRestricoes}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.itemRemovivel}>
                <Text style={styles.itemR}>{item}</Text>
                <TouchableOpacity onPress={() => removerRestricao(index)}>
                  <Ionicons name='trash-outline' size={20} color='red' />
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity style={styles.botao} onPress={salvarReceita}>
            <Text style={styles.botaoText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MenuInferior />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  menuSup: {
    backgroundColor: "#768E91",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titulo: {
    color: "#fff7e8",
    fontSize: 26,
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
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
    borderColor: "#f1e0c5",
  },
  inputMaior: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    borderColor: "#f1e0c5",
    minHeight: 100,
    textAlignVertical: "top",
  },
  linha: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  inputMenor: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#f1e0c5",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  botaoAdicionar: {},
  itemI: {
    color: "#3d3d3d",
    marginBottom: 6,
    paddingLeft: 6,
  },
  itemR: {
    backgroundColor: "#f4e3c3",
    color: "#3d3d3d",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  itemRemovivel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingLeft: 6,
    paddingRight: 10,
  },
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fef7e9",
  },
  botao: {
    marginTop: 25,
    backgroundColor: "#0066CC",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoText: {
    color: "#fff",
    fontSize: 16,
  },
});
