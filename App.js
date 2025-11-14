import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ajuda_vizinhanca_posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('pedido');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPosts !== null) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (e) {
      console.error('Falha ao carregar os posts.', e);
    }
  };

  const savePosts = async (newPosts) => {
    try {
      const jsonValue = JSON.stringify(newPosts);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Falha ao salvar os posts.', e);
    }
  };

  const handleAddPost = () => {
    if (postContent.trim() === '') {
      return;
    }

    const newPost = {
      id: String(new Date().getTime()),
      type: postType,
      content: postContent.trim(),
      timestamp: new Date().toLocaleString('pt-BR'),
    };

    const newPostsList = [newPost, ...posts];
    setPosts(newPostsList);
    savePosts(newPostsList);

    setModalVisible(false);
    setPostContent('');
    setPostType('pedido');
  };

  const PostItem = ({ item }) => (
    <View style={styles.postItem}>
      <View style={styles.postIconContainer}>
        {/* Mostra um ícone diferente para Pedido ou Oferta */}
        <Text style={styles.postIcon}>
          {item.type === 'pedido' ? '🙋‍♂️' : '🤝'}
        </Text>
      </View>
      <View style={styles.postContentContainer}>
        <Text style={styles.postType}>
          {item.type === 'pedido' ? 'PEDIDO DE AJUDA' : 'OFERTA DE AJUDA'}
        </Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <Text style={styles.postTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajuda Vizinhança</Text>
      </View>

      {/* Lista de Posts */}
      <FlatList
        data={posts}
        renderItem={PostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post ainda.</Text>
            <Text style={styles.emptySubText}>
              Clique em "Adicionar Post" para começar.
            </Text>
          </View>
        }
      />

      {/* Botão flutuante para adicionar post */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Modal para Adicionar Novo Post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Novo Post</Text>

            {/* Seletor de Tipo (Pedido / Oferta) */}
            <View style={styles.typeSelectorContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  postType === 'pedido' && styles.typeButtonActive,
                ]}
                onPress={() => setPostType('pedido')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    postType === 'pedido' && styles.typeButtonTextActive,
                  ]}
                >
                  🙋‍♂️ Pedido
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  postType === 'oferta' && styles.typeButtonActive,
                ]}
                onPress={() => setPostType('oferta')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    postType === 'oferta' && styles.typeButtonTextActive,
                  ]}
                >
                  🤝 Oferta
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input do Conteúdo */}
            <TextInput
              style={styles.modalInput}
              placeholder="Descreva seu pedido ou oferta..."
              multiline
              value={postContent}
              onChangeText={setPostContent}
            />

            {/* Botões de Ação */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSubmit]}
                onPress={handleAddPost}
              >
                <Text style={styles.modalButtonText}>Postar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  emptySubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postIconContainer: {
    marginRight: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postIcon: {
    fontSize: 20,
  },
  postContentContainer: {
    flex: 1,
  },
  postType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
    lineHeight: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  typeSelectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeButtonActive: {
    backgroundColor: '#e6f2ff',
    borderColor: '#007bff',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: '#f4f4f8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  modalButtonCancel: {
    backgroundColor: '#f1f1f1',
  },
  modalButtonSubmit: {
    backgroundColor: '#007bff',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});