import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ícones
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MenuInferior from "../ui/MenuInferior";

const { width } = Dimensions.get("window");

export default function TelaListarReceitas() {
  const [receitas, setReceitas] = useState(null);
  const [filtro, setFiltro] = useState("");
  useEffect(() => {
    const consultarReceitas = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.warn("Token não encontrado");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/receitas?filtro=${filtro}`,
          {
            headers: { "Login-Token": token },
          }
        );

        setReceitas(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    consultarReceitas();
  }, [filtro]);

  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaInicial() {
    navigation.navigate("TelaInicial");
  }

  async function paraTelaCadastroReceita() {
    navigation.navigate("TelaCadastroReceita");
  }

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }

  async function paraDetalhamentoReceita(id: number) {
    navigation.navigate("DetalhamentoReceita", { id });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => paraDetalhamentoReceita(item?.id)}>
      <View style={styles.receitaCard}>
        <Image
          source={{
            uri:
              item?.imagens?.[0] ??
              require("../../assets/images/image-icon.jpg"),
          }}
          style={styles.receitaImagem}
        />
        <View style={styles.receitaInfo}>
          <Text style={styles.receitaNome}>{item?.titulo}</Text>
          <Text
            style={styles.restricoes}
            numberOfLines={item?.restricoes?.length}
          >
            {item?.restricoes?.map((item) => item.nome + "\n")}
          </Text>
        </View>
        <View style={styles.notaContainer}>
          <Ionicons name='time-outline' size={20} />
          <Text>{item?.tempoPreparo}min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={paraTelaInicial}>
          <Ionicons name='arrow-back' size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Receitas</Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={styles.searchContainer}>
          <Ionicons name='search' size={20} />
          <TextInput
            placeholder='Pesquisar'
            value={filtro}
            style={styles.searchInput}
            onChangeText={setFiltro}
          ></TextInput>
        </View>
      </View>

      <View style={styles.divider} />

      <FlatList
        data={receitas}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <View>
        <TouchableOpacity
          style={styles.botaoCriarNova}
          onPress={paraTelaCadastroReceita}
        >
          <Ionicons name='add' size={20} color='#fff' />
          <Text style={styles.botaoCriarNovaTexto}>Criar nova</Text>
        </TouchableOpacity>
      </View>

      <MenuInferior />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbf5",
    flex: 1,
    padding: 28,
    paddingVertical: 40,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#eee",
    borderRadius: 30,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 48,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    borderRadius: 12,
  },
  filterButton: {
    backgroundColor: "#eee",
    borderRadius: 30,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 48,
  },
  divider: {
    marginVertical: 20,
    width: "100%",
    height: 1,
    backgroundColor: "#cccccc",
  },
  receitaCard: {
    position: "relative",
    backgroundColor: "#fef7e8",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingBottom: 25,
    marginBottom: 12,
  },
  receitaImagem: {
    width: 70,
    height: 70,
    backgroundColor: "#ccc",
  },
  receitaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  receitaNome: {
    fontWeight: "bold",
    color: "#555555",
    fontSize: 18,
  },
  restricoes: {
    color: "#555555",
    fontSize: 16,
  },
  notaContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#f6eccf",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 12,
  },
  botaoCriarNova: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: "#3D65D6",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  botaoCriarNovaTexto: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
  },
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fef7e9",
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});
