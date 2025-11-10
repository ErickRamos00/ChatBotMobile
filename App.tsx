import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBubble from './components/MessageBubble';
import EmergencyModal from './components/EmergencyModal';
import { containsOffensiveLanguage } from './utils/offensive';
import { styles } from './styles';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

import { GROQ_API_KEY } from '@env';
const API_BASE_URL = 'https://your-backend.example.com';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('usuarioAtual');
      if (user) {
        setCurrentUser(user);
        fetchHistorico(user);
      } else {
        const welcome: Message = {
          id: '1',
          text: 'Olá! Eu sou o Best Virtual, seu assistente de saúde mental. Como você está se sentindo hoje? 😊',
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages([welcome]);
      }
    })();
  }, []);

  const fetchHistorico = async (user: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/historico`);
      if (!res.ok) throw new Error('Erro ao buscar histórico');
      const data = await res.json();

      const userMessages = data
        .filter((item: any) => item.usuario === user)
        .sort((a: any,b: any) => new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime())
        .map((item: any) => ({
          id: item.id.toString(),
          text: item.texto,
          sender: item.remetente === 'user' ? 'user' : 'bot',
          timestamp: item.criadoEm
        }));

      if (userMessages.length === 0) {
        // keep welcome
      } else {
        const welcomeMessage: Message = {
          id: 'welcome',
          text: `Que bom te ver novamente! Como posso te ajudar hoje? 😊`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage, ...userMessages]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const salvarNoHistorico = async (mensagem: Message) => {
    if (!currentUser) return;
    try {
      await fetch(`${API_BASE_URL}/api/historico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: currentUser, texto: mensagem.text, remetente: mensagem.sender, criadoEm: mensagem.timestamp })
      });
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isTyping) return;

    if (containsOffensiveLanguage(newMessage)) {
      const warningMessage: Message = {
        id: Date.now().toString(),
        text: 'Por favor, mantenha o respeito durante nossa conversa. Podemos continuar de forma positiva? 😊',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, warningMessage]);
      await salvarNoHistorico(warningMessage);
      setNewMessage('');
      return;
    }

    if (/(suicídio|me matar|quero morrer|não aguento mais)/i.test(newMessage)) {
      setShowEmergencyModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    await salvarNoHistorico(userMessage);

    try {
      const systemMessage = {
        role: 'system',
        content: `Você é um assistente de saúde mental chamado Best Virtual. Siga estas diretrizes:\n1. Seja empático e acolhedor\n2. Use o nome do usuário apenas quando for natural\n3. Ressalte que você não substitui ajuda profissional\n4. Em casos de crise, sugira contatar um colaborador do MindCare\n5. Use linguagem simples e acessível\n6. Responda em português brasileiro\n7. Mantenha respostas entre 2-4 frases\n8. Quando perguntado sobre histórico, mencione que tem acesso às conversas anteriores`
      };

      const messagesForAPI = messages
        .filter(msg => msg.id !== '1' && msg.id !== 'welcome')
        .map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({ model: 'llama3-70b-8192', messages: [systemMessage, ...messagesForAPI], temperature: 0.7, max_tokens: 150 }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || 'Desculpe, não consegui processar.';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      await salvarNoHistorico(botMessage);
    } catch (error: any) {
      console.error('Erro na API:', error);
      const fallbackMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Houve um erro ao processar sua mensagem. Você pode reformular?',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      await salvarNoHistorico(fallbackMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioAtual');
    setCurrentUser(null);
    Alert.alert('Logout', 'Você foi deslogado.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.therapistInfo}>
          <FontAwesome name="heartbeat" size={32} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>Best Virtual</Text>
            <Text style={styles.subtitle}>Assistente de Saúde Mental</Text>
          </View>
        </View>

        <View style={styles.userControls}>
          {currentUser ? (
            <View style={styles.userInfo}>
              <Text>Olá, {currentUser}</Text>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => {}} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setShowEmergencyModal(true)} style={styles.emergencyButton}>
            <FontAwesome name="heart" size={18} />
            <Text style={{ marginLeft: 6 }}>Ajuda Emergencial</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => (
            <MessageBubble message={item.text} sender={item.sender} time={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} isTyping={false} />
          )}
          ListFooterComponent={isTyping ? <ActivityIndicator style={{ margin: 12 }} /> : null}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite como você está se sentindo..."
            value={newMessage}
            onChangeText={setNewMessage}
            editable={!isTyping}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={isTyping || !newMessage.trim()}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.quickSuggestions}>
          <Text>Tente dizer:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setNewMessage('Estou me sentindo ansioso hoje')} style={styles.suggestionButton}>
              <Text>Estou ansioso</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewMessage('Como lidar com o estresse?')} style={styles.suggestionButton}>
              <Text>Dicas para estresse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <EmergencyModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
    </SafeAreaView>
  );
}
