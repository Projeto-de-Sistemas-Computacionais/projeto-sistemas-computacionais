import React, { useState } from 'react';
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const receitas = [
  { id: '1', titulo: 'Bolo de cenoura', restricoes: 'Sem lactose', tempo: 45 },
  { id: '2', titulo: 'Salada fresca', restricoes: 'Vegano', tempo: 15 },
  { id: '3', titulo: 'Macarrão integral', restricoes: 'Vegetariano', tempo: 30 },
  { id: '4', titulo: 'Panqueca sem glúten', restricoes: 'Sem glúten', tempo: 25 },
  { id: '5', titulo: 'Sopa detox', restricoes: 'Low carb', tempo: 40 },
  { id: '6', titulo: 'Quiche vegana', restricoes: 'Vegano', tempo: 35 },
];

const produtos = [
  { id: '1', titulo: 'Pão sem glúten', restricoes: 'Sem glúten' },
  { id: '2', titulo: 'Leite vegetal', restricoes: 'Sem lactose' },
  { id: '3', titulo: 'Tofu orgânico', restricoes: 'Vegano' },
  { id: '4', titulo: 'Granola natural', restricoes: 'Sem açúcar' },
  { id: '5', titulo: 'Iogurte grego', restricoes: 'Low carb' },
  { id: '6', titulo: 'Biscoito integral', restricoes: 'Integral' },
];

const restaurantes = [
  { id: '1', titulo: 'Verde Vida', restricoes: 'Vegetariano' },
  { id: '2', titulo: 'Sushi Light', restricoes: 'Comida japonesa' },
  { id: '3', titulo: 'BioBurguer', restricoes: 'Orgânico' },
  { id: '4', titulo: 'Salad Mix', restricoes: 'Vegano' },
  { id: '5', titulo: 'Delícia Natural', restricoes: 'Natural e saudável' },
  { id: '6', titulo: 'Fit Gourmet', restricoes: 'Fitness' },
];

export default function TelaFavoritos() {
  const [abaAtiva, setAbaAtiva] = useState<'receitas' | 'produtos' | 'restaurantes'>('receitas');

  const dataAtual =
    abaAtiva === 'receitas' ? receitas : abaAtiva === 'produtos' ? produtos : restaurantes;

  const renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <View style={styles.receitaCard}>
        <Image source={require('../../assets/images/image-icon.jpg')} style={styles.receitaImagem} />
        <View style={styles.receitaInfo}>
          <Text style={styles.receitaNome}>{item.titulo}</Text>
          <Text style={styles.restricoes} numberOfLines={1}>{item.restricoes}</Text>
        </View>
        {item.tempo && (
          <View style={styles.notaContainer}>
            <Ionicons name="time-outline" size={20} />
            <Text>{item.tempo}min</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fffbf5' }}>
      <View style={styles.container}>

          <View style={styles.abaContainer}>
          <TouchableOpacity
            style={[styles.abaBotao, abaAtiva === 'produtos' && styles.abaAtiva]}
            onPress={() => setAbaAtiva('produtos')}>
            <Text style={styles.abaTexto}>Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.abaBotao, abaAtiva === 'receitas' && styles.abaAtiva]}
            onPress={() => setAbaAtiva('receitas')}>
            <Text style={styles.abaTexto}>Receitas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.abaBotao, abaAtiva === 'restaurantes' && styles.abaAtiva]}
            onPress={() => setAbaAtiva('restaurantes')}>
            <Text style={styles.abaTexto}>Restaurantes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Favoritos</Text>
        </View>

        <FlatList
          data={dataAtual}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
          <Ionicons name="bookmark" size={24} color="#3D65D6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-outline" size={24} />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  abaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  abaBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  abaAtiva: {
    borderBottomColor: '#B89B80',
  },
  abaTexto: {
    fontSize: 16,
    color: '#B89B80',    
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#cccccc',
    marginBottom: 20,
  },
  receitaCard: {
    backgroundColor: '#fef7e8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    marginBottom: 12,
  },
  receitaImagem: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  receitaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  receitaNome: {
    fontWeight: 'bold',
    color: '#555555',
    fontSize: 18,
  },
  restricoes: {
    color: '#555555',
    fontSize: 16,
  },
  notaContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#f6eccf',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
  },
  menuInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fef7e9',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
