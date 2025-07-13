import React, { useEffect, useState } from 'react';
import { View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TelaExcluirConta() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaMeuPerfil() {
    navigation.navigate("TelaMeuPerfil");
  }

  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [senha, setSenha] = useState("");

  const [senhaInput, setSenhaInput] = useState("");
  const [senhaInputVisivel, setSenhaInputVisivel] = useState(false);
  const alternarVisibilidadeSenhaInput = () => { setSenhaInputVisivel(!senhaInputVisivel); };

  useEffect(() => {
    async function buscarDadosUsuario() {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
          navigation.navigate("TelaLogin");
          return;
        }

        const response = await axios.get("http://localhost:8080/usuarios/logado", {
          headers: { "login-token": token },
        });
        const id = response.data.id;
        setIdUsuario(id);

        const dadosCompletos = await axios.get(`http://localhost:8080/usuarios/${id}`, {
          headers: { "login-token": token },
        });
        setSenha(dadosCompletos.data.senha);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error?.response?.data || error.message);

        if (Platform.OS === "web") {
          alert("Não foi possível carregar os dados do usuário. Faça login novamente.");
        } else {
          Alert.alert("Erro", "Não foi possível carregar os dados do usuário. Faça login novamente.");
        }
        navigation.navigate("TelaLogin");
      }
    }
    buscarDadosUsuario();
  }, []);

  const confirmarAcao = (titulo: string, mensagem: string, aoConfirmar: () => void) => {
    if (Platform.OS === "web") {
      const confirm = window.confirm(mensagem);
      if (confirm) aoConfirmar();
    } else {
      Alert.alert(
        titulo,
        mensagem,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: aoConfirmar, style: 'destructive' },
        ],
        { cancelable: true }
      );
    }
  };

  const handleConfirmarExclusao = () => {
    confirmarAcao(
      "Confirmar Exclusão",
      "Esta ação é irreversível. Continuar?",
      () => handleExcluirConta()
    );
  };

  const handleExcluirConta = async () => {
    if (!senhaInput.trim()) {
      Alert.alert("Campo obrigatório", "Insira a senha para prosseguir com a exclusão.");
      return;
    }

    if (senhaInput !== senha) {
      Alert.alert("Erro", "Senha incorreta.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Sessão expirada");

      await axios.delete(`http://localhost:8080/usuarios/${idUsuario}`, {
        headers: { "login-token": token },
      });

      Alert.alert("Sucesso", "Conta excluída com sucesso!");
      await AsyncStorage.clear();
      navigation.navigate("TelaLogin");

    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      Alert.alert("Erro", error.response?.data.mensagem || "Não foi possível excluir a conta.");
    }
  };

  return (
    <View style={styles.tela}>

      <View style={styles.menuSup}>
        <TouchableOpacity onPress={paraTelaMeuPerfil}>
          <Ionicons name="arrow-back" size={24} color={'#fff7e8'} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Excluir conta</Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>

          <Text style={styles.texto}>
            Insira a sua senha para prosseguir com a exclusão.
          </Text>

          <Text style={styles.label}>
            Senha
          </Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!senhaInputVisivel}
              value={senhaInput}
              onChangeText={setSenhaInput}
            />
            <TouchableOpacity onPress={alternarVisibilidadeSenhaInput} style={styles.icon}>
              <Ionicons name={senhaInputVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <View style={styles.contBotao}>
        <TouchableOpacity style={styles.botao} onPress={handleConfirmarExclusao}>
          <Text style={styles.botaoText}>Excluir conta</Text>
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
    alignSelf: "center",
  },
  formContainer: {
    backgroundColor: "white",
    paddingHorizontal: 19,
    paddingTop: 16,
  },
  texto: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "auto",
    color: "#333",
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
    paddingRight: 40,
  },
  senhaContainer: {
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contBotao: {
    paddingHorizontal: 20,
  },
  botao: {
    marginTop: 40,
    backgroundColor: "#6CA08B",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoText: {
    color: "#fff",
    fontSize: 20,
  },
});