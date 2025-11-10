import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

type Props = {
  message: string;
  sender: 'user' | 'bot';
  time?: string;
  isTyping?: boolean;
};

export default function MessageBubble({ message, sender, time, isTyping }: Props) {
  const isUser = sender === 'user';
  return (
    <View style={[styles.bubbleContainer, isUser ? styles.userBubble : styles.botBubble]}>
      <Text style={isUser ? styles.userText : styles.botText}>{message}</Text>
      {time ? <Text style={styles.timeText}>{time}</Text> : null}
    </View>
  );
}
