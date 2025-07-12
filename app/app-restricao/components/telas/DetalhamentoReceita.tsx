import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuInferior from "../ui/MenuInferior";
import { Colors } from "../../constants/Colors";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function DetalhamentoReceita() {
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [receita, setReceita] = useState(null);
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
          `http://localhost:8080/receitas/${id}`,
          {
            headers: { "Login-Token": token },
          }
        );

        setReceita(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    consultarReceita();
  }, []);

  async function paraTelaInicial() {
    navigation.navigate("TelaInicial");
  }

  async function paraTelaListarReceitas() {
    navigation.navigate("TelaListarReceitas");
  }

  const favoritarReceita = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.warn("Token não encontrado");
        return;
      }

      await axios.post(
        `http://localhost:8080/receitas/${id}/favoritar`,
        {},
        {
          headers: { "Login-Token": token },
        }
      );

      alert("Receita favoritada com sucesso!");
    } catch (error) {
      console.error("Erro ao favoritar a receita:", error);
      alert("Erro ao favoritar. Tente novamente.");
    }
  };

  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={paraTelaListarReceitas}>
                <Ionicons name='arrow-back-outline' size={32} color='white' />
              </TouchableOpacity>
              <TouchableOpacity onPress={favoritarReceita}>
                <Ionicons name='bookmark' size={32} color='white' />
              </TouchableOpacity>
            </View>
            <Text style={styles.restaurantName}>{receita?.titulo}</Text>
          </View>

          <View style={styles.avaliacoes}>
            <View style={styles.starsRow}>
              <Ionicons name='play' size={25} />
              <Text style={styles.avaliacoesTexto}>
                {receita?.tempoPreparo} minutos de preparo
              </Text>
            </View>

            <View style={styles.restricaoItem}>
              <Text style={styles.restricaoTexto}>
                publicado por {receita?.usuarioCriador?.nomeCompleto}
              </Text>
            </View>

            <View style={styles.restricoesContainer}>
              {receita?.restricoes?.map((restricao) => (
                <View style={styles.restricaoItem} key={restricao?.id}>
                  <Ionicons name='checkmark-outline' size={25} />
                  <Text style={styles.restricaoTexto}>{restricao.nome}</Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.secaoTitulo}>DESCRIÇÃO</Text>
            <Text style={styles.descricaoReceitaTexto}>
              {receita?.descricao}
            </Text>
          </View>

          <View>
            <Text style={styles.secaoTitulo}>PASSO A PASSO</Text>
            <Text style={styles.passoReceitaTexto}>{receita?.modoPreparo}</Text>
          </View>

          <View style={styles.divisor} />

          <View>
            <Text style={styles.secaoTitulo}>INGREDIENTES</Text>
            {receita?.ingredientes?.map((ingrediente) => (
              <Text key={ingrediente?.id} style={styles.ingredienteTexto}>
                {ingrediente?.descricao}
              </Text>
            ))}
          </View>

          <View style={styles.botaoWrapper}>
            <TouchableOpacity
              style={styles.botaoEdicao}
              onPress={() =>
                navigation.navigate("TelaEditarReceita", { id: receita?.id })
              }
            >
              <Text style={styles.textoBotao}>Editar receita</Text>
            </TouchableOpacity>
          </View>
          {/*
          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoAvaliacao}>
              <Text style={styles.textoBotao}>☆ Fazer uma avaliação</Text>
            </TouchableOpacity>
          </View>*/}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  restaurantName: {
    textAlign: "center",
    fontSize: 34,
    color: Colors.white,
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
  secaoTitulo: {
    fontSize: 22,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    textTransform: "uppercase",
  },
  descricaoReceitaTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 15,
    lineHeight: 22,
    color: "#333",
  },
  passoReceitaTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 15,
    lineHeight: 22,
    color: "#333",
  },
  ingredienteTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingVertical: 4,
    lineHeight: 22,
    color: "#444",
  },
  divisor: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  botaoWrapper: {
    alignItems: "center",
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  botaoAvaliacao: {
    backgroundColor: "#216AC1",
    borderRadius: 15,
    width: 364,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoEdicao: {
    backgroundColor: "#6CA08B",
    borderRadius: 15,
    width: 364,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.white,
  },
});
