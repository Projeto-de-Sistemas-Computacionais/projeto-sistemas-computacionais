import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RedefinirSenha() {
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(true);

  const validarEmail = (text: string) => {
    setEmail(text);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValido(regex.test(text));
  };

  const enviarLinkRecuperacao = () => {
    if (!emailValido || email.trim() === "") {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }
    Alert.alert(
      "Sucesso",
      "Link para recuperação de senha enviado para o seu email."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Redefina sua senha</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Esqueceu sua senha? Digite seu email abaixo:
        </Text>

        <Text style={styles.label}>Endereço de email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="black"
          keyboardType="email-address"
          style={[styles.input, !emailValido && styles.inputError]}
          value={email}
          onChangeText={validarEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!emailValido && <Text style={styles.errorText}>Email inválido</Text>}

        <TouchableOpacity style={styles.button} onPress={enviarLinkRecuperacao}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#768E91",
    paddingVertical: 40,
    paddingHorizontal: 100,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#222",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
    fontSize: 24,
  },
  input: {
    borderWidth: 2,
    borderColor: "CDB49E",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingRight: 40,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6CA08B",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
