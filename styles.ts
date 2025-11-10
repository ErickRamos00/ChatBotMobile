import { StyleSheet } from 'react-native';

// Paleta de cores relaxante e acolhedora
const colors = {
  primary: '#7C9EB2',     // Azul suave
  secondary: '#94B49F',   // Verde sage
  accent: '#CEE5D0',      // Verde menta claro
  background: '#F8F7F2',  // Bege claro
  text: '#2C3639',        // Cinza escuro suave
  lightText: '#5C6B73',   // Cinza médio
  shadow: 'rgba(0,0,0,0.1)',
  bubble: {
    user: '#94B49F',      // Verde sage para mensagens do usuário
    bot: '#E8F3F1',       // Verde água muito claro para mensagens do bot
    userText: '#FFFFFF',  // Texto branco para mensagens do usuário
    botText: '#2C3639'    // Texto cinza escuro para mensagens do bot
  }
};

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  header: { 
    padding: 16,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderColor: colors.shadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  therapistInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: '600',
    color: '#FFFFFF'
  },
  subtitle: { 
    fontSize: 14, 
    color: colors.accent,
    marginTop: 2
  },
  userControls: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logoutButton: { 
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  backButton: { 
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  emergencyButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12,
    backgroundColor: '#FFE3E3',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 8
  },
  messagesContainer: { 
    padding: 16, 
    paddingBottom: 24 
  },
  bubbleContainer: { 
    marginVertical: 8, 
    padding: 12, 
    borderRadius: 16, 
    maxWidth: '80%',
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  userBubble: { 
    alignSelf: 'flex-end', 
    backgroundColor: colors.bubble.user 
  },
  botBubble: { 
    alignSelf: 'flex-start', 
    backgroundColor: colors.bubble.bot 
  },
  userText: { 
    color: colors.bubble.userText,
    fontSize: 16,
    lineHeight: 22
  },
  botText: { 
    color: colors.bubble.botText,
    fontSize: 16,
    lineHeight: 22
  },
  timeText: { 
    fontSize: 12, 
    color: colors.lightText, 
    marginTop: 6,
    opacity: 0.8
  },
  inputArea: { 
    flexDirection: 'row', 
    padding: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1, 
    borderColor: colors.shadow,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  input: { 
    flex: 1, 
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1, 
    borderColor: colors.primary,
    marginRight: 12,
    fontSize: 16,
    backgroundColor: colors.background
  },
  sendButton: { 
    backgroundColor: colors.primary, 
    padding: 12,
    borderRadius: 24,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  quickSuggestions: { 
    padding: 12,
    borderTopWidth: 1, 
    borderColor: colors.shadow,
    backgroundColor: '#FFFFFF'
  },
  suggestionButton: { 
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
    backgroundColor: colors.background
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  modalTitle: { 
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.text
  },
  helplineButton: { 
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.accent,
    marginBottom: 10,
    alignItems: 'center'
  },
  closeButton: { 
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginTop: 8
  }
});
