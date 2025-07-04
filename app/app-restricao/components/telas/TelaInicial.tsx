import React from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuInferior from "../ui/MenuInferior";
import { useNavigation, NavigationProp } from '@react-navigation/native';

const categorias = [
  { id: "1", nome: "Categoria" },
  { id: "2", nome: "Categoria" },
  { id: "3", nome: "Categoria" },
];

const receitas = [
  { id: "1", nome: "Bolo de Cenoura" },
  { id: "2", nome: "Lasanha" },
  { id: "3", nome: "Salada Detox" },
];

const restaurantes = [
  { id: "1", nome: "Restaurante A" },
  { id: "2", nome: "Restaurante B" },
  { id: "3", nome: "Restaurante C" },
];

const { width } = Dimensions.get("window");

export default function TelaInicial() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraDetalhamentoReceita() {
    navigation.navigate("DetalhamentoReceita");
  }

  async function paraDetalhamentoRestaurante() {
    navigation.navigate("DetalhamentoRestaurante");
  }

  async function paraTelaLogin() {
    navigation.navigate("TelaLogin");
  }

  async function paraTelaListarReceitas() {
    navigation.navigate("TelaListarReceitas");
  }

  async function paraTelaListagemRestaurantes() {
    navigation.navigate("TelaListagemRestaurantes");
  }

  const renderCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.avaliacao}>
          <Ionicons name="star" size={14} color="white" />
          <Text style={styles.avaliacaoTexto}>5,0 av.</Text>
        </View>
        <View style={styles.flag}>
          <Ionicons name="bookmark-outline" size={20} color="black" />
        </View>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.nomeTexto}>{item.nome}</Text>
        <Text style={styles.tempoTexto}>Tempo: 30 min</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoria = ({ item }) => (
    <View style={styles.categoriaItem}>
      <Ionicons
        name="star"
        size={15}
        color="black"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.categoriaTexto}>{item.nome}</Text>
    </View>
  );

  return (
    <View style={{height: "100%" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.topoVerde}>
            <View style={styles.headerUser}>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={48}
                  color="white"
                />
                <View style={styles.boasVindas}>
                  <Text style={styles.olaTexto}>Olá, fulano</Text>
                  <Text style={styles.bemVindoTexto}>Seja bem vindo!</Text>
                </View>
              </View>
              <TouchableOpacity onPress={paraTelaLogin}>
                <Ionicons name="exit-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="search-outline"
                size={20}
                color="white"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Pesquisar"
                placeholderTextColor="white"
                style={styles.campoBusca}
              />
            </View>
          </View>

          <Text style={styles.tituloSecao}>Categorias</Text>
          <FlatList
            horizontal
            data={categorias}
            renderItem={renderCategoria}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaHorizontal}
          />

          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Receitas Recomendadas</Text>
            <TouchableOpacity onPress={paraTelaListarReceitas}>
              <Text style={styles.verTodas}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={receitas}
            renderItem={({ item }) => renderCard(item)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaHorizontal}
          />

          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Restaurantes Recomendados</Text>
            <TouchableOpacity onPress={paraTelaListagemRestaurantes}>
              <Text style={styles.verTodas}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={restaurantes}
            renderItem={({ item }) => renderCard(item)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaHorizontal}
          />
        </ScrollView>
        <MenuInferior />
    </View>
  );
}


const styles = StyleSheet.create({
  topoVerde: {
    backgroundColor: "#768E91",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  boasVindas: {
    marginLeft: 10,
  },
  olaTexto: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bemVindoTexto: {
    color: "white",
    fontSize: 14,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  tituloSecao: {
    fontSize: width * 0.035,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  listaHorizontal: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef7e9",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 23,
    marginRight: 20,
    minWidth: 100,
    justifyContent: "center",
  },
  categoriaTexto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fef7e9",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  verTodas: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    width: 280,
    marginRight: 16,
    backgroundColor: "#fef7e9",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  flag: {
    position: "absolute",
    top: 8, // um pouco de espaçamento do topo
    right: 8, // um pouco de espaçamento da direita
  },
  cardTop: {
    backgroundColor: "#fef7e9",
    padding: 8,
    minHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avaliacao: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#768E91",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 5,
  },

  avaliacaoTexto: {
    color: "white",
    marginLeft: 4,
    fontSize: 12,
  },

  cardBottom: {
    backgroundColor: "white",
    padding: 10,
  },

  nomeTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  tempoTexto: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1.5,
    minHeight: 50,
    paddingHorizontal: 12,
    marginTop: 20,
  },

  searchIcon: {
    marginRight: 8,
    color: "white",
  },

  campoBusca: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    paddingVertical: 8,
  },
});
