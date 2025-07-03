import React from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones

const { width } = Dimensions.get('window');

interface Produto {
  id: string;
  nome: string;
  restricoes: string;
  fabricante: string;
  nota: number;
}

const produtos = [
    {id: '1', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '2', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
        {id: '3', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '4', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '5', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '6', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '7', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6},
    {id: '8', 
        nome: 'Nome do produto', 
        restricoes: 'Restrição 1, restrição...', 
        fabricante: 'Fabricante exe...', 
        nota: 4.6}
]

export default function TelaListarProdutos() {

    const renderItem = ({ item }: { item: Produto }) => (
        <TouchableOpacity>
            <View style={styles.produtoCard}>
                <Image source={require('../../assets/images/image-icon.jpg')} style={styles.produtoImagem}/>
                <View style={styles.produtoInfo}>
                    <Text style={styles.produtoNome}>{item.nome}</Text>
                    <Text style={styles.restricoes} numberOfLines={1}>{item.restricoes}</Text>
                    <Text style={styles.fabricante} numberOfLines={1}>{item.fabricante}</Text>
                </View>
                <View style={styles.notaContainer}>
                    <Ionicons name="star-outline" size={ 20 }/>
                    <Text>{item.nota}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
        
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Produtos</Text>
            </View>

            <View style={{ gap: 12 }}>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={ 20 }/>
                    <TextInput placeholder='Pesquisar' style={styles.searchInput}></TextInput>
                </View>
                
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="funnel" size={ 20 }/>
                    <Text style={{ color: '#555555' }}>Filtros</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider}/>

            <FlatList data={produtos} 
            renderItem={renderItem} 
            keyExtractor={item => item.id} 
            contentContainerStyle={{ paddingBottom: 30 }} />

            <View style={styles.menuInferior}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="home-outline" size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="location-outline" size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="add-circle-outline" size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="bookmark-outline" size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name="person-outline" size={24}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbf5',
    flex: 1,
    padding: 28,
    paddingVertical: 40,
    width: '100%',
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
  searchContainer: {
    backgroundColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  filterButton: {
    backgroundColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
  },
  divider: {
    marginVertical: 20,
    width: '100%',
    height: 1,
    backgroundColor: '#cccccc',
  },
  produtoCard: {
    position: 'relative',
    backgroundColor: '#fef7e8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    marginBottom: 12,
  },
  produtoImagem: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
  },
  produtoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  produtoNome: {
    fontWeight: 'bold',
    color: '#555555',
    fontSize: 18,
  },
  restricoes: {
    color: '#555555',
    fontSize: 16,
  },
  fabricante: {
    color: '#555555',
    fontSize: 16,
  },
  notaContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
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