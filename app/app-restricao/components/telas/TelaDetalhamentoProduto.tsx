import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomMenu from '../ui/MenuInferior';

interface Produto {
  id: number;
  nome: string;
  avaliacoes: number;
  fabricante: string;
  descricao: string;
  composicao: string;
  endereco: string;
}

export default function ProdutoScreen() {

  const mockProduto: Produto = {
    id: 1,
    nome: 'Produto Fictício',
    avaliacoes: 99,
    fabricante: 'Mock Indústria LTDA',
    descricao: 'Este é um produto de exemplo exibido por fallback.',
    composicao: 'Composição simulada',
    endereco: 'Rua Exemplo, 123 - Cidade Fictícia',
  };

  const [produto, setProduto] = useState<Produto>(mockProduto);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch('http://10.0.2.2:8080/api/produtos/1');
        if (!response.ok) throw new Error('Erro na API');
        const data = await response.json();

        if (!data || !data.nome) {
          setProduto(mockProduto);
        } else {
          setProduto(data);
        }
      } catch (error) {
        setProduto(mockProduto);
      }
    }

    fetchProduto();
  }, []);


  if (!produto) {
    return (
      <View style={styles.container}>
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  // Resto da renderização (mantém como você já tem)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{produto.nome}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name={index < 4 ? 'star' : 'star-o'}
              size={20}
              color="#000"
            />
          ))}
          <Text style={styles.ratingText}>{produto.avaliacoes} avaliações</Text>
        </View>

        <Text style={styles.sectionTitle}>Fabricado por:</Text>
        <Text style={styles.paragraph}>{produto.fabricante}</Text>

        <Text style={styles.sectionTitle}>Descrição do produto:</Text>
        <Text style={styles.paragraph}>{produto.descricao}</Text>

        <Text style={styles.sectionTitle}>Composição:</Text>
        <Text style={styles.paragraph}>{produto.composicao}</Text>

        <Text style={styles.sectionTitle}>Tabela nutricional:</Text>
        <View style={styles.imgPlaceholder}>
          <Text style={{ color: '#d9c9b5' }}>Imagem</Text>
        </View>

        <Text style={styles.address}>{produto.endereco}</Text>

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
  position: 'relative',
},
content: {
  flex: 1,
  padding: 15,
  paddingBottom: 100,  
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