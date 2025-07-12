import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MenuInferior from "../ui/MenuInferior";

interface Receita {
  id: string;
  titulo: string;
  restricoes: string;
  tempo: number;
  tempoPreparo: number;
}

export default function TelaMeuPerfil() {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [receitasFavoritas, setReceitasFavoritas] = useState<Receita[]>([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8080/usuarios/logado",
            {
              headers: {
                "Login-Token": token,
              },
            }
          );
          setUsuario(response.data);
        } catch (e) {
          console.error("Erro ao buscar usuario logado:", e);
          await AsyncStorage.clear();
          navigation.navigate("TelaLogin");
        }
      }
    };

    buscarUsuarioLogado();
  }, []);

  useEffect(() => {
    const fetchReceitasFavoritas = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(
          `http://localhost:8080/receitas?filtro=${usuario.nomeCompleto}`,
          {
            headers: { "Login-Token": token },
          }
        );

        setReceitasFavoritas(response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas favoritas:", error);
      }
    };

    fetchReceitasFavoritas();
  }, [usuario]);

  const renderReceita = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetalhamentoReceita", { id: item.id })
      }
    >
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.card}>
            <View style={styles.header}>
              <TouchableOpacity onPress={paraTelaInicial}>
                <Ionicons name='arrow-back-outline' size={32} color='white' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name='pencil' size={32} color='white' />
              </TouchableOpacity>
            </View>

            <View style={styles.perfil}>
              <Image
                source={require("../../assets/images/IconUser.webp")}
                style={{ width: 100, height: 100 }}
              />

              <View style={{ alignItems: "center", padding: 16 }}>
                <Text style={styles.nomeUsuario}>{usuario?.nomeCompleto}</Text>
                <View style={styles.endereco}>
                  <Text style={{ color: "white" }}>
                    {usuario?.endereco?.rua}, {usuario?.endereco?.numero} -{" "}
                    {usuario?.endereco?.cidade}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons name='refresh-outline' size={20} color='white' />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.restricoesBox}>
                {usuario?.restricoes?.map((restricao) => (
                  <Text key={restricao.id} style={styles.restricao}>
                    {restricao.nome}
                  </Text>
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 28, padding: 10 }}>Minhas Receitas</Text>
              <FlatList
                horizontal
                data={receitasFavoritas}
                renderItem={(item) => renderReceita(item)}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </ScrollView>

        <MenuInferior />

        {/* Modal de edição */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType='fade'
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalMenu}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("AlterarInformacoesPerfil");
                }}
              >
                <Text>Alterar informações do perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("TelaRedefinirSenha");
                }}
              >
                <Text>Alterar senha</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#768E91",
  },
  nomeUsuario: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  endereco: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  restricoesBox: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
    margin: 12,
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
  perfil: {
    backgroundColor: "#768E91",
    textAlign: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  restricao: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    margin: 4,
    padding: 5,
    color: "white",
  },
  menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fef7e9",
    borderColor: "#ddd",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
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
  flag: {
    position: "absolute",
    top: 8,
    right: 8,
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
  listaHorizontal: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalMenu: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 6,
    width: 260,
  },
  modalItem: {
    paddingVertical: 10,
  },
});
