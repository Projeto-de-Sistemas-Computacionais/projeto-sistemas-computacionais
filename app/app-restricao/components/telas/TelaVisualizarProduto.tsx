import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../ui/MenuBottom'; 

export default function ProdutoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Nome do produto</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={20} color="#000" />
          <FontAwesome name="star" size={20} color="#000" />
          <FontAwesome name="star" size={20} color="#000" />
          <FontAwesome name="star" size={20} color="#000" />
          <FontAwesome name="star-o" size={20} color="#000" />
          <Text style={styles.ratingText}>87 avaliações</Text>
        </View>

        <View style={styles.restrictions}>
          <View style={styles.restrictionItem}>
            <Ionicons name="checkmark" size={18} color="#000" />
            <Text style={styles.restrictionText}>Restrição que abrange</Text>
          </View>
          <View style={styles.restrictionItem}>
            <Ionicons name="checkmark" size={18} color="#000" />
            <Text style={styles.restrictionText}>Restrição que abrange</Text>
          </View>
        </View>

        {/* Seção: Fabricado por */}
        <Text style={styles.sectionTitle}>Fabricado por:</Text>
        <Text style={styles.paragraph}>Nome do fabricante</Text>

        {/* Seção: Descrição do produto */}
        <Text style={styles.sectionTitle}>Descrição do produto:</Text>
        <Text style={styles.paragraph}>
          Descrição do produto segundo o fabricante
        </Text>

        {/* Seção: Composição do produto */}
        <Text style={styles.sectionTitle}>Composição:</Text>
        <Text style={styles.paragraph}>
          Ingredientes presentes no produto
        </Text>

        <Text style={styles.sectionTitle}>Tabela nutricional:</Text>

        <View style={styles.imgPlaceholder}>
          <Text style={{ color: '#d9c9b5' }}>Imagem</Text>
        </View>

        <Text style={styles.address}>Endereço, 99. Cidade - UF</Text>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="star" size={18} color="#fff" />
          <Text style={styles.buttonText}>Fazer uma avaliação</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#718e91',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 15,
  },
  ratingText: {
    marginLeft: 10,
    color: '#666',
  },
  restrictions: {
    marginBottom: 15,
  },
  restrictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  restrictionText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  imgPlaceholder: {
    backgroundColor: '#f7efe3',
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#326fc8',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    padding: 5,
  },
});
