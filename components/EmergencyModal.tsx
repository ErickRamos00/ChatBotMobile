import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EmergencyModal({ isOpen, onClose }: Props) {
  const openHelpline = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Se você está em risco</Text>
          <Text style={{ marginBottom: 12 }}>Se estiver em perigo imediato, ligue para um serviço de emergência agora.</Text>

          <TouchableOpacity style={styles.helplineButton} onPress={() => openHelpline('190')}>
            <Text>Chamar emergência (190)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helplineButton} onPress={() => openHelpline('188')}>
            <Text>Linha de apoio (188)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
