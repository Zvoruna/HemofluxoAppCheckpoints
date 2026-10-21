import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { LocalDoacao } from '../models/LocalDoacao';
import { listarLocais } from '../services/localDoacaoService';

export default function ListaScreen() {
  const [locais, setLocais] = useState<LocalDoacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarLocais = useCallback(async () => {
    try {
      setCarregando(true);
      setErro('');

      const dados = await listarLocais();
      setLocais(dados);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar os locais de doação.'
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarLocais();
  }, [carregarLocais]);

  function mostrarRequisitos() {
    Alert.alert(
      'Antes de doar',
      'Verifique os critérios de doação e as orientações oficiais do hemocentro. A equipe de saúde avaliará se você está apto a doar.'
    );
  }

  function mostrarImportancia() {
    Alert.alert(
      'Por que doar sangue?',
      'A doação de sangue ajuda a manter os estoques necessários para transfusões e tratamentos. Uma equipe especializada orientará você durante todo o processo.'
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={carregando}
          onRefresh={carregarLocais}
          colors={['#C62845']}
          tintColor="#C62845"
        />
      }
    >
      <View style={styles.cabecalho}>
        <View style={styles.marca}>
          <View style={styles.iconeMarca}>
            <Text style={styles.iconeMarcaTexto}>♥</Text>
          </View>

          <View>
            <Text style={styles.nomeApp}>Hemofluxo</Text>
            <Text style={styles.subtituloMarca}>
              Doar é compartilhar vida
            </Text>
          </View>
        </View>

        <View style={styles.selo}>
          <Text style={styles.seloTexto}>SAÚDE E SOLIDARIEDADE</Text>
        </View>
      </View>

      <View style={styles.banner}>
        <View style={styles.bannerEtiqueta}>
          <Text style={styles.bannerEtiquetaTexto}>
            UMA AÇÃO QUE TRANSFORMA VIDAS
          </Text>
        </View>

        <Text style={styles.tituloBanner}>
          Sua doação pode salvar vidas.
        </Text>

        <Text style={styles.textoBanner}>
          Descubra onde doar sangue e saiba mais sobre esse processo.
        </Text>

        <TouchableOpacity
          style={styles.botaoBanner}
          onPress={carregarLocais}
          activeOpacity={0.85}
        >
          <Text style={styles.textoBotaoBanner}>
            Conhecer locais de doação
          </Text>
          <Text style={styles.setaBotao}>→</Text>
        </TouchableOpacity>

        <View style={styles.decoracaoCoracao}>
          <Text style={styles.coracaoGrande}>♥</Text>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Comece por aqui</Text>
        <Text style={styles.descricaoSecao}>
          Informação é o primeiro passo para ajudar.
        </Text>

        <View style={styles.gradeAtalhos}>
          <TouchableOpacity
            style={styles.cartaoAtalho}
            onPress={mostrarRequisitos}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconeAtalho,
                { backgroundColor: '#FCE8EC' },
              ]}
            >
              <Text style={styles.emojiAtalho}>✓</Text>
            </View>

            <Text style={styles.tituloAtalho}>Quem pode doar?</Text>
            <Text style={styles.textoAtalho}>
              Conheça quem se classifica.
            </Text>
			{/* setas para direita → ⮕ ⇨ ⇒ ➔ ➜ ↝ ↦ ↛ ❯ ⮚ 🡪 🡺 🢂 🢚 ➔ ➛ ➜ ➝ ➞ ➟ ➡ */}
			
            <Text style={styles.linkAtalho}>Saiba mais →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartaoAtalho}
            onPress={mostrarImportancia}
            activeOpacity={0.8}>
            <View
              style={[
                styles.iconeAtalho,
                { backgroundColor: '#FDF0DF' },
              ]}>
				{/* coração ♡ ♥ ❤ ❣*/}
              <Text style={styles.emojiAtalho}>♥</Text>
            </View>

            <Text style={styles.tituloAtalho}>Por que doar?</Text>
            <Text style={styles.textoAtalho}>
              Entenda a importância da doação.
            </Text>

            <Text style={styles.linkAtalho}>Saiba mais →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secao}>
        <View style={styles.tituloLocaisLinha}>
          <View style={styles.tituloLocaisGrupo}>
            <Text style={styles.tituloSecao}>Locais de doação</Text>
            <Text style={styles.descricaoSecao}>
              Encontre um local para sua próxima doação.
            </Text>
          </View>

          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>{locais.length}</Text>
          </View>
        </View>

        {carregando && locais.length === 0 ? (
          <View style={styles.estado}>
            <ActivityIndicator size="large" color="#C62845" />
            <Text style={styles.estadoTexto}>
              Buscando locais de doação...
            </Text>
          </View>
        ) : erro !== '' && locais.length === 0 ? (
          <View style={styles.estado}>
            <Text style={styles.iconeErro}>!</Text>
            <Text style={styles.tituloEstado}>
              Não foi possível carregar os locais
            </Text>
            <Text style={styles.estadoTexto}>{erro}</Text>

            <TouchableOpacity
              style={styles.botaoTentar}
              onPress={carregarLocais}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoTentar}>
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </View> ) : locais.length === 0 ? (
          <View style={styles.estado}>
            <Text style={styles.emojiVazio}>⌖</Text>
            <Text style={styles.tituloEstado}>
              Nenhum local cadastrado
            </Text>
            <Text style={styles.estadoTexto}>
              Quando houver locais disponíveis, eles aparecerão aqui.
            </Text>
          </View>
        ) : (
          <View style={styles.listaLocais}>
            {locais.map((local) => (
              <View key={local.id} style={styles.cartaoLocal}>
                <View style={styles.iconeLocal}>
                  <Text style={styles.emojiLocal}>⌖</Text>
                </View>

                <View style={styles.dadosLocal}>
                  <Text style={styles.nomeLocal}>{local.nome}</Text>

                  <Text style={styles.enderecoLocal}>
                    {local.endereco}
                  </Text>

                  <Text style={styles.cidadeLocal}>
                    {local.cidade} - {local.estado}
                  </Text>

                  <Text style={styles.telefoneLocal}>
                    Tel.: {local.telefone}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {!carregando && erro !== '' && locais.length > 0 && (
          <Text style={styles.avisoAtualizacao}>
            Não foi possível atualizar os dados. Exibindo os últimos
            locais carregados.
          </Text>
        )}
      </View>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTitulo}>
          Cada doação faz a diferença.
        </Text>
        <Text style={styles.rodapeTexto}>
          Hemofluxo · Mel · Programação Mobile - 8° Termo.
        </Text>
        <Text style={styles.rodapeAviso}>
          (Locais dependem da API)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F7',
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 36,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  iconeMarca: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#C62845',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeMarcaTexto: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
  },

  nomeApp: {
    color: '#30272B',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  subtituloMarca: {
    color: '#82757A',
    fontSize: 11,
    marginTop: 2,
  },

  selo: {
    backgroundColor: '#FCE8EC',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 9,
  },
  seloTexto: {
    color: '#A51F39',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  //banner
  banner: {
    backgroundColor: '#B92240',
    borderRadius: 25,
    padding: 24,
    paddingVertical: 27,
    overflow: 'hidden',
    marginBottom: 30,
  },

  bannerEtiqueta: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF25',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 19,
  },

  bannerEtiquetaTexto: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tituloBanner: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.8,
    marginBottom: 12,
  },

  textoBanner: {
    color: '#FFE8ED',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '90%',
    marginBottom: 23,
  },
/*  textoBanner: {
    color: '#f390a6',
    fontSize: 16,
    font-weight: 400;,
    maxWidth: '90%',
    marginBottom: 23,
  },*/
  botaoBanner: {
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    borderRadius: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    gap: 16,
  },

  textoBotaoBanner: {
    color: '#A51F39',
    fontSize: 12,
    fontWeight: '800',
  },
  setaBotao: {
    color: '#A51F39',
    fontSize: 20,
  },
  decoracaoCoracao: {
    position: 'absolute',
    right: -14,
    bottom: -38,
    opacity: 0.12,
  },
  coracaoGrande: {
    color: '#FFFFFF',
    fontSize: 150,
  },
  secao: {
    marginBottom: 30,
  },
  tituloSecao: {
    color: '#30272B',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  descricaoSecao: {
    color: '#82757A',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  gradeAtalhos: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 17,
  },
  cartaoAtalho: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#F0E7E9',
    padding: 15,
    minHeight: 183,
  },
  iconeAtalho: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emojiAtalho: {
    color: '#B92240',
    fontSize: 23,
    fontWeight: '800',
  },

  tituloAtalho: {
    color: '#30272B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },

  textoAtalho: {
    color: '#82757A',
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },

  linkAtalho: {
    color: '#B92240',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 12,
  },

  tituloLocaisLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  tituloLocaisGrupo: {
    flex: 1,
  },

  contador: {
    minWidth: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: '#FCE8EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contadorTexto: {
    color: '#B92240',
    fontSize: 15,
    fontWeight: '800',
  },

  listaLocais: {
    gap: 12,
    marginTop: 17,
  },
  cartaoLocal: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E7E9',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
  },
  iconeLocal: {
    width: 44,
    height: 44,
    backgroundColor: '#FCE8EC',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiLocal: {
    color: '#B92240',
    fontSize: 27,
	//fontSize: 24,
    fontWeight: 'bold',
  },
  dadosLocal: {
    flex: 1,
  },

  nomeLocal: {
    color: '#30272B',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 7,
  },

  enderecoLocal: {
    color: '#62565B',
    fontSize: 12,
    lineHeight: 18,
  },

  cidadeLocal: {
    color: '#82757A',
    fontSize: 12,
    marginTop: 3,
  },

  telefoneLocal: {
    color: '#B92240',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 9,
  },

  estado: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E7E9',
    borderRadius: 19,
    padding: 23,
    alignItems: 'center',
    marginTop: 17,
  },

  estadoTexto: {
    color: '#82757A',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 9,
  },

  tituloEstado: {
    color: '#30272B',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },

  iconeErro: {
    color: '#B92240',
    backgroundColor: '#FCE8EC',
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
    fontSize: 25,
    fontWeight: '800',
  },

  emojiVazio: {
    color: '#B92240',
    fontSize: 40,
  },

  botaoTentar: {
    backgroundColor: '#B92240',
    borderRadius: 11,
    paddingHorizontal: 19,
    paddingVertical: 12,
    marginTop: 17,
  },

  textoBotaoTentar: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  avisoAtualizacao: {
    color: '#A51F39',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
  },

  rodape: {
    borderTopWidth: 1,
    borderTopColor: '#EDE3E5',
    paddingTop: 21,
    alignItems: 'center',
  },
  rodapeTitulo: {
    color: '#30272B',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  rodapeTexto: {
    color: '#82757A',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 7,
  },
  //excluir rodapeaviso?
  rodapeAviso: {
    //color: '#A1969A',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 9,
  },
});
