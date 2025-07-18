import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ícones
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TelaLogin() {
  const navigation = useNavigation<NavigationProp<any>>();

  async function paraTelaRecuperacaoSenha() {
    navigation.navigate("TelaRecuperacaoSenha");
  }

  async function paraTelaCadastro() {
    navigation.navigate("TelaCadastro");
  }

  async function paraTelaInicial() {
    navigation.navigate("TelaInicial");
  }

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const realizarLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/usuarios/login",
        {
          email: email,
          senha: senha,
        }
      );

      if (response.status === 200) {
        const token = response.headers["login-token"];
        console.log(response.headers);

        if (token) {
          await AsyncStorage.setItem("authToken", token);
          console.log("Token salvo:", token);
          paraTelaInicial();
        } else {
          console.warn("Token não encontrado no header");
        }
      }
    } catch (erro) {
      console.error("Erro no login:", erro);
      await AsyncStorage.clear();
      window.alert("Usuário ou senha inválidos");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#768E91",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          paddingVertical: 40,
          paddingHorizontal: 100,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 32, color: "white", textAlign: "center" }}>
          Boas-vindas ao BocaDim!
        </Text>
        <View style={styles.imagemContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode='cover'
          />
        </View>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 30 }}>Entrar na conta</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Endereço de email:</Text>
          <TextInput
            style={[styles.input]}
            placeholder='email@dominio.com'
            placeholderTextColor='black'
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder='********'
              placeholderTextColor='black'
              secureTextEntry={!senhaVisivel}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              onPress={alternarVisibilidadeSenha}
              style={styles.icon}
            >
              <Ionicons
                name={senhaVisivel ? "eye-off" : "eye"}
                size={24}
                color='gray'
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "black",
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={paraTelaRecuperacaoSenha}
          >
            Esqueceu a senha?
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.button, { width: "50%" }]}
            onPress={realizarLogin}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              Entrar
            </Text>
          </TouchableOpacity>

          <Text
            style={{ color: "black", textAlign: "center", marginTop: 8 }}
            onPress={paraTelaCadastro}
          >
            Não tem uma conta? Crie a sua
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "gray",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  imagemContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  label: {
    fontSize: 24,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    paddingRight: 40, // espaço para o ícone
    fontSize: 16,
  },
  passwordContainer: {
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
  button: {
    color: "black",
    borderRadius: 5,
    backgroundColor: "#6CA08B",
    padding: 10,
    alignSelf: "center",
    marginTop: 110,
  },
});
