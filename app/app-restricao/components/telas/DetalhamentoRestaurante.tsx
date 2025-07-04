import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';


export default function DetalhamentoRestaurante() {
  const navigation = useNavigation<NavigationProp<any>>();

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
                <Ionicons name="arrow-back-outline" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="bookmark" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.restaurantName}>Nome do restaurante</Text>
          </View>

          {/* Avaliações */}
          <View style={styles.avaliacoes}>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <TouchableOpacity key={i}>
                  <Ionicons name="star-outline" size={25} />
                </TouchableOpacity>
              ))}
              <Text style={styles.avaliacoesTexto}>0 Avaliações</Text>
            </View>

            {/* Restrições */}
            <View style={styles.restricoesContainer}>
              <View style={styles.restricaoItem}>
                <Ionicons name="checkmark-outline" size={25} />
                <Text style={styles.restricaoTexto}>Restrição que abrange</Text>
              </View>
              <View style={styles.restricaoItem}>
                <Ionicons name="checkmark-outline" size={25} />
                <Text style={styles.restricaoTexto}>Restrição que abrange</Text>
              </View>
              <View style={styles.divisor} />
            </View>
          </View>

          {/* Localização */}
          <View style={styles.localizacaoContainer}>
            <Text style={styles.localizacaoTitulo}>Localização:</Text>
            <View style={styles.mapaWrapper}>
              <View style={styles.mapaBox}>
                <Text>Mapa</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20 }}>
                  Rua Exemplo, 123 - Bairro - Cidade
                </Text>
              </View>
            </View>
          </View>

          {/* Botão de avaliação */}
          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoAvaliacao}>
              <Text style={styles.textoBotao}>☆ Fazer uma avaliação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Barra inferior fixa */}
        <View style={styles.menuInferior}>
          <TouchableOpacity style={styles.item} onPress={paraTelaInicial}>
            <Ionicons name="home-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="location-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={paraTelaCadastroReceita}>
            <Ionicons name="add-circle-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="bookmark-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={paraTelaMeuPerfil}>
            <Ionicons name="person-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // Espaço para a barra inferior
  },
  header: {
    backgroundColor: '#768E91',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 200,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantName: {
    textAlign: 'center',
    fontSize: 34,
    color: 'white',
    paddingTop: 40,
  },
  avaliacoes: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avaliacoesTexto: {
    fontSize: 22,
    paddingHorizontal: 15,
  },
  restricoesContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingTop: 15,
  },
  restricaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  restricaoTexto: {
    fontSize: 16,
  },
  divisor: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  localizacaoContainer: {
    paddingHorizontal: 20,
  },
  localizacaoTitulo: {
    fontSize: 34,
    alignSelf: 'flex-start',
  },
  mapaWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  mapaBox: {
    backgroundColor: '#F9EBCF',
    padding: 20,
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoWrapper: {
    alignItems: 'center',
    paddingTop: 20,
  },
  botaoAvaliacao: {
    backgroundColor: '#216AC1',
    borderRadius: 15,
    width: 364,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  menuInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fef7e9',
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
