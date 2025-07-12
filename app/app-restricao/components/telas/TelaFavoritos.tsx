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
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MenuInferior from "../ui/MenuInferior";

const { width } = Dimensions.get("window");

export default function TelaFavoritos() {
  const [abaAtiva, setAbaAtiva] = useState<"receitas" | "restaurantes">(
    "receitas"
  );

  const [receitas, setReceitas] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);

  const dataAtual = abaAtiva === "receitas" ? receitas : restaurantes;

  useEffect(() => {
    const fetchReceitasFavoritas = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:8080/usuarios/receitasFavoritas",
          {
            headers: { "Login-Token": token },
          }
        );

        setReceitas(response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas favoritas:", error);
      }
    };

    const fetchRestaurantesFavoritos = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:8080/usuarios/restaurantesFavoritos",
          {
            headers: { "Login-Token": token },
          }
        );

        setRestaurantes(response.data);
      } catch (error) {
        console.error("Erro ao buscar restaurantes favoritas:", error);
      }
    };

    fetchReceitasFavoritas();
    fetchRestaurantesFavoritos();
  }, []);

  const renderReceita = ({ item }: any) => (
    <TouchableOpacity>
      <View style={styles.receitaCard}>
        <Image
          source={{
            uri:
              item.imagens?.[0] ??
              require("../../assets/images/image-icon.jpg"),
          }}
          style={styles.receitaImagem}
        />
        <View style={styles.receitaInfo}>
          <Text style={styles.receitaNome}>{item?.titulo}</Text>
          <Text style={styles.restricoes} numberOfLines={4}>
            {item?.restricoes?.map((restricao) => (
              <Text key={restricao.id}>{restricao?.nome + "\n"}</Text>
            ))}
          </Text>
        </View>
        {item?.tempo && (
          <View style={styles.notaContainer}>
            <Ionicons name='time-outline' size={20} />
            <Text>{item.tempo}min</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRestaurante = ({ item }: any) => (
    <TouchableOpacity>
      <View style={styles.receitaCard}>
        <Image
          source={{
            uri: item?.imagem ?? require("../../assets/images/image-icon.jpg"),
          }}
          style={styles.receitaImagem}
        />
        <View style={styles.receitaInfo}>
          <Text style={styles.receitaNome}>{item.nome}</Text>
          <Text style={styles.restricoes} numberOfLines={1}>
            {item?.restricoes?.map((restricao) => (
              <Text key={restricao.id}>{restricao.nome} </Text>
            ))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fffbf5" }}>
      <View style={styles.container}>
        <View style={styles.abaContainer}>
          <TouchableOpacity
            style={[
              styles.abaBotao,
              abaAtiva === "receitas" && styles.abaAtiva,
            ]}
            onPress={() => setAbaAtiva("receitas")}
          >
            <Text style={styles.abaTexto}>Receitas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.abaBotao,
              abaAtiva === "restaurantes" && styles.abaAtiva,
            ]}
            onPress={() => setAbaAtiva("restaurantes")}
          >
            <Text style={styles.abaTexto}>Restaurantes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name='arrow-back' size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Favoritos</Text>
        </View>

        <FlatList
          data={dataAtual}
          renderItem={
            abaAtiva == "receitas" ? renderReceita : renderRestaurante
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <MenuInferior />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
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
  abaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  abaBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  abaAtiva: {
    borderBottomColor: "#B89B80",
  },
  abaTexto: {
    fontSize: 16,
    color: "#B89B80",
    fontWeight: "600",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccccc",
    marginBottom: 20,
  },
  receitaCard: {
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
    borderRadius: 8,
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
    right: 10,
    bottom: 10,
    backgroundColor: "#f6eccf",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 12,
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
    paddingBottom: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});
