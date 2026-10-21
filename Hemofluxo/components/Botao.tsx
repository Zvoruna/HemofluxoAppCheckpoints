
import { Pressable, StyleSheet, Text } from 'react-native';

type BotaoProps = {
  titulo: string;
  onPress: () => void;
  desabilitado?: boolean;
};

export default function Botao({
  titulo,
  onPress,
  desabilitado = false,
}: BotaoProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.botao,
        pressed && styles.botaoPressionado,
        desabilitado && styles.botaoDesabilitado,
      ]}
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#B92240',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
