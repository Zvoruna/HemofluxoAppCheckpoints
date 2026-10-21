//antigo prof
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusTarefa } from "../models/Tarefa";

type CardProps = {
    id: number,
    titulo: string,
    descricao: string,
    status: StatusTarefa,
    onPress: () => void
}

function formatarStatus(status: StatusTarefa) {
  if (status === 'EmAndamento') {
    return 'Em Andamento';
  }

  if (status === 'Concluida') {
    return 'Concluída';
  }

  return 'Pendente';
}


export default function Card({ 
    id,
    titulo, 
    descricao, 
    status,
    onPress
    }: CardProps) 
{
 
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{ titulo }</Text>
            <Text style={styles.descricao}>{ descricao }</Text>
            
            <View style={styles.rodape}>
              <Text style={styles.status}>Status: { formatarStatus(status) }</Text>

              <Pressable 
                  style={styles.botaoExcluir}
                  onPress={onPress}
              >
                  <Text style={styles.textoExcluir}>Detalhes</Text>
              </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    },
  
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 6,
    },
  
    descricao: {
      fontSize: 15,
      marginBottom: 8,
    },
  
    status: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  
    botaoExcluir: {
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      marginTop: 12,
      alignItems: 'center',
    },
  
    textoExcluir: {
      fontWeight: 'bold',
    },

    rodape: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12
    },
  });