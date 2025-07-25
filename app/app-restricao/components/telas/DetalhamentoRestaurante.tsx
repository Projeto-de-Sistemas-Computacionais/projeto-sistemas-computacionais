import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MenuInferior from "../ui/MenuInferior";

export default function DetalhamentoRestaurante() {
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [restaurante, setRestaurante] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const consultarReceita = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.warn("Token não encontrado");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/restaurantes/${id}`,
          {
            headers: { "Login-Token": token },
          }
        );

        setRestaurante(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    consultarReceita();
  }, []);

  const favoritarRestaurante = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.warn("Token não encontrado");
        return;
      }

      await axios.post(
        `http://localhost:8080/restaurantes/${id}/favoritar`,
        {},
        {
          headers: { "Login-Token": token },
        }
      );

      alert("Restaurante favoritado com sucesso!");
    } catch (error) {
      console.error("Erro ao favoritar o restaurante:", error);
      alert("Erro ao favoritar. Tente novamente.");
    }
  };

  async function paraTelaListagemRestaurantes() {
    navigation.navigate("TelaListagemRestaurantes");
  }

  async function paraTelaInicial() {
    navigation.navigate("TelaInicial");
  }

  async function paraTelaCadastroReceita() {
    navigation.navigate("TelaCadastroReceita");
  }

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Conteúdo rolável */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={paraTelaListagemRestaurantes}>
                <Ionicons name='arrow-back-outline' size={32} color='white' />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name='bookmark'
                  size={32}
                  color='white'
                  onPress={favoritarRestaurante}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.restaurantName}>{restaurante?.nome}</Text>
          </View>

          {/* Avaliações */}
          <View style={styles.avaliacoes}>
            {/* Restrições */}

            <View style={styles.restricoesContainer}>
              {restaurante?.restricoes?.map((restricao) => (
                <View style={styles.restricaoItem} key={restricao?.id}>
                  <Ionicons name='checkmark-outline' size={25} />
                  <Text style={styles.restricaoTexto}>
                    {restricao.nome + " - " + restricao.descricao}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Localização */}
          <View style={styles.localizacaoContainer}>
            <Text style={styles.localizacaoTitulo}>Localização:</Text>
            <View style={styles.mapaWrapper}>
              <View>
                <Text style={{ fontSize: 20 }}>
                  {restaurante?.endereco?.rua}, {restaurante?.endereco?.numero}{" "}
                  - {restaurante?.endereco?.cidade}
                </Text>
              </View>
            </View>
          </View>

          {/* Botão de avaliação
          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoAvaliacao}>
              <Text style={styles.textoBotao}>☆ Fazer uma avaliação</Text>
            </TouchableOpacity>
          </View>
          */}

          {restaurante?.imagem && (
            <View style={styles.imagemContainer}>
              <Image
                source={{ uri: restaurante.imagem }}
                style={styles.imagemRestaurante}
                resizeMode='cover'
              />
            </View>
          )}
        </ScrollView>

        {/* Barra inferior fixa */}

        <MenuInferior />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // Espaço para a barra inferior
  },
  imagemContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imagemRestaurante: {
    width: 400,
    height: 400,
    borderRadius: 12,
  },
  header: {
    backgroundColor: "#768E91",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 200,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  restaurantName: {
    textAlign: "center",
    fontSize: 34,
    color: "white",
    paddingTop: 40,
  },
  avaliacoes: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avaliacoesTexto: {
    fontSize: 22,
    paddingHorizontal: 15,
  },
  restricoesContainer: {
    flexDirection: "column",
    gap: 10,
    paddingTop: 15,
  },
  restricaoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  restricaoTexto: {
    fontSize: 16,
  },
  divisor: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  localizacaoContainer: {
    paddingHorizontal: 20,
  },
  localizacaoTitulo: {
    fontSize: 34,
    alignSelf: "flex-start",
  },
  mapaWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  mapaBox: {
    backgroundColor: "#F9EBCF",
    padding: 20,
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoWrapper: {
    alignItems: "center",
    paddingTop: 20,
  },
  botaoAvaliacao: {
    backgroundColor: "#216AC1",
    borderRadius: 15,
    width: 364,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
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
