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

export default function DetalhamentoReceita() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.header}>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Ionicons name="arrow-back-outline" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="bookmark" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.restaurantName}>Nome da receita</Text>
          </View>

          <View style={styles.avaliacoes}>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <TouchableOpacity key={i}>
                  <Ionicons name="star-outline" size={25} />
                </TouchableOpacity>
              ))}
              <Text style={styles.avaliacoesTexto}>0 Avaliações</Text>
            </View>

            <View style={styles.starsRow}>
              <Ionicons name="play" size={25} />
              <Text style={styles.avaliacoesTexto}>30 min</Text>
            </View>

            <View style={styles.restricaoItem}>
              <Text style={styles.restricaoTexto}>publicado por nomeExemplo</Text>
            </View>

            <View style={styles.restricoesContainer}>
              <View style={styles.restricaoItem}>
                <Ionicons name="checkmark-outline" size={25} />
                <Text style={styles.restricaoTexto}>Restrição que abrange</Text>
              </View>
              <View style={styles.restricaoItem}>
                <Ionicons name="checkmark-outline" size={25} />
                <Text style={styles.restricaoTexto}>Restrição que abrange</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.secaoTitulo}>DESCRIÇÃO</Text>
            <Text style={styles.descricaoReceitaTexto}>Descrição do autor</Text>
          </View>

          <View>
            <Text style={styles.secaoTitulo}>PASSO A PASSO</Text>
            <Text style={styles.passoReceitaTexto}>Passo a passo da receita</Text>
          </View>

          <View style={styles.divisor} />

          <View>
            <Text style={styles.secaoTitulo}>INGREDIENTES</Text>
            <Text style={styles.ingredienteTexto}>- 3 xícaras de açúcar</Text>
            <Text style={styles.ingredienteTexto}>- 3 ovos</Text>
          </View>

          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoEdicao}>
              <Text style={styles.textoBotao}>Editar receita</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.botaoWrapper}>
            <TouchableOpacity style={styles.botaoAvaliacao}>
              <Text style={styles.textoBotao}>☆ Fazer uma avaliação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.menuInferior}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="home-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="location-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="add-circle-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="bookmark-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="person-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
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
  secaoTitulo: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  descricaoReceitaTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 15,
    lineHeight: 22,
    color: '#333',
  },
  passoReceitaTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 15,
    lineHeight: 22,
    color: '#333',
  },
  ingredienteTexto: {
    paddingHorizontal: 20,
    fontSize: 16,
    paddingVertical: 4,
    lineHeight: 22,
    color: '#444',
  },
  divisor: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
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
  botaoEdicao: {
    backgroundColor: '#6CA08B',
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
