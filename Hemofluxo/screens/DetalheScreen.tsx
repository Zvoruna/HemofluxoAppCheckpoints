
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export default function DetalheScreen({ route }: Props) {
  const { local } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{local.nome}</Text>

      <Text style={styles.texto}>Endereço: {local.endereco}</Text>
      <Text style={styles.texto}>Cidade: {local.cidade} - {local.estado}</Text>
      <Text style={styles.texto}>Telefone: {local.telefone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B92240',
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333333',
  },
});
