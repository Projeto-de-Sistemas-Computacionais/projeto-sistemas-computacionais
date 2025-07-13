import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function MenuInferior() {
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

  function paraTelaFavoritos() {
    navigation.navigate("TelaFavoritos");
  }

  return (
    <View style={styles.menuInferior}>
      <TouchableOpacity style={styles.item} onPress={paraTelaInicial}>
        <Ionicons name='home-outline' size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={paraTelaCadastroReceita}>
        <Ionicons name='add-circle-outline' size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name='bookmark-outline'
          size={24}
          onPress={paraTelaFavoritos}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='person-outline' size={24} onPress={paraTelaMeuPerfil} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    marginBottom: 0,
    backgroundColor: "#fef7e9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});
