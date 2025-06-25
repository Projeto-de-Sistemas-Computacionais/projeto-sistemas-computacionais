import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones

const { width } = Dimensions.get('window');

interface Receita {
  id: string;
  titulo: string;
  restricoes: string;
  tempo: number;
}

const receitas = [
    {id: '1', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '2', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
        {id: '3', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '4', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '5', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '6', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '7', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30},
    {id: '8', 
        titulo: 'Título da receita', 
        restricoes: 'Restrição', 
        tempo: 30}
]

export default function TelaListarReceitas() {

    const renderItem = ({ item }: { item: Receita }) => (
        <TouchableOpacity>
            <View style={styles.receitaCard}>
                <Image source={require('../../assets/images/image-icon.jpg')} style={styles.receitaImagem}/>
                <View style={styles.receitaInfo}>
                    <Text style={styles.receitaNome}>{item.titulo}</Text>
                    <Text style={styles.restricoes} numberOfLines={1}>{item.restricoes}</Text>
                </View>
                <View style={styles.notaContainer}>
                    <Ionicons name="time-outline" size={ 20 }/>
                    <Text>{item.tempo}min</Text>
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
                <Text style={styles.headerText}>Receitas</Text>
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

            <FlatList data={receitas} 
            renderItem={renderItem} 
            keyExtractor={item => item.id} 
            contentContainerStyle={{ paddingBottom: 30 }} />

            <View>
                <TouchableOpacity style={styles.botaoCriarNova}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.botaoCriarNovaTexto}>Criar nova</Text>
                </TouchableOpacity>
            </View>

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
    fontSize: 19,
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
  receitaCard: {
    position: 'relative',
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
  botaoCriarNova: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: '#3D65D6',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  botaoCriarNovaTexto: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
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