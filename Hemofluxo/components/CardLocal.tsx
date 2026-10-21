
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LocalDoacao } from '../models/LocalDoacao';

type CardLocalProps = {
  local: LocalDoacao;
  onPress: () => void;
};

export default function CardLocal({
  local,
  onPress,
}: CardLocalProps) {
  return (
    <View style={styles.card}>
      <View style={styles.indicador} />

      <View style={styles.conteudo}>
        <Text style={styles.nome}>{local.nome}</Text>

        <Text style={styles.endereco}>
          {local.endereco}
        </Text>

        <Text style={styles.cidade}>
          {local.cidade} - {local.estado}
        </Text>

        <Text style={styles.telefone}>
          Telefone: {local.telefone}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
          onPress={onPress}
          accessibilityRole="button"
        >
          <Text style={styles.textoBotao}>
            Ver detalhes
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0DFE3',
    elevation: 2,
  },
  indicador: {
    width: 5,
    borderRadius: 5,
    backgroundColor: '#B92240',
    marginRight: 14,
  },
  conteudo: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#292126',
    marginBottom: 8,
  },
  endereco: {
    fontSize: 14,
    color: '#51464A',
    marginBottom: 4,
  },
  cidade: {
    fontSize: 14,
    color: '#76676D',
    marginBottom: 8,
  },
  telefone: {
    fontSize: 13,
    color: '#51464A',
    marginBottom: 12,
  },
  botao: {
    alignSelf: 'flex-start',
    backgroundColor: '#FBECEF',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 9,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#B92240',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
