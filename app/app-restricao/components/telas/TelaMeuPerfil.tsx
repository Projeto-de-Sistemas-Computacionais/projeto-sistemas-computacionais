import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Receita {
  id: string;
  titulo: string;
  restricoes: string;
  tempo: number;
}

const receitas = [
  { id: '1', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '2', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '3', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '4', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '5', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '6', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '7', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 },
  { id: '8', titulo: 'Título da receita', restricoes: 'Restrição', tempo: 30 }
];

export default function TelaMeuPerfil({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: Receita }) => (
    <TouchableOpacity>
      <View style={styles.receitaCard}>
        <Image source={require('../../assets/images/image-icon.jpg')} style={styles.receitaImagem} />
        <View style={styles.receitaInfo}>
          <Text style={styles.receitaNome}>{item.titulo}</Text>
          <Text style={styles.restricoes} numberOfLines={1}>{item.restricoes}</Text>
        </View>
        <View style={styles.notaContainer}>
          <Ionicons name="time-outline" size={20} />
          <Text>{item.tempo}min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 16, alignItems: 'center', backgroundColor: '#768E91' }}>
            <TouchableOpacity>
              <Ionicons name='arrow-back-outline' size={32} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name='pencil' size={32} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.perfil}>
            <Image source={require('../../assets/images/IconUser.webp')} style={{ width: 100, height: 100 }} />

            <View style={{ alignItems: 'center', padding: 16 }}>
              <Text style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>Nome do usuário</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, marginTop: 8 }}>
                <Text style={{ color: 'white' }}>Logradouro, 99 Cidade - UF</Text>
                <TouchableOpacity>
                  <Ionicons name='refresh-outline' size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <Text style={styles.restricao}>Restrição</Text>
              <Text style={styles.restricao}>Restrição</Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 28, padding: 10 }}>Minhas Receitas</Text>
            <FlatList
              data={receitas}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 30 }}
            />
          </View>

          {/* Menu Modal */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
              <View style={styles.modalMenu}>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('EditarPerfil'); // ajuste se necessário
                }}>
                  <Text>Alterar informações do perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AlterarSenha'); // ajuste se necessário
                }}>
                  <Text>Alterar senha</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  perfil: {
    backgroundColor: '#768E91',
    textAlign: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  restricao: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 4,
    padding: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 6,
    width: 260,
  },
  modalItem: {
    paddingVertical: 10,
  },
  restricoes: {
    color: '#555555',
    fontSize: 16,
  },
});
