import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ListaScreen from './screens/ListaScreen';
/*import DetalheScreen from './screens/DetalheScreen';
import EdicaoScreen from './screens/EdicaoScreen';
import CadastroScreen from './screens/CadastroScreen';*/

import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="MainStack"
        initialRouteName="Lista"
      >
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{
            headerShown: false,
          }}
        />

        {/*<Stack.Screen
          name="Detalhe"
          component={DetalheScreen}
          options={{
            title: 'Detalhes',
            headerTintColor: '#B92240',
          }}
        />

        <Stack.Screen
          name="Edicao"
          component={EdicaoScreen}
          options={{
            title: 'Editar',
            headerTintColor: '#B92240',
          }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            title: 'Cadastro',
            headerTintColor: '#B92240',
          }}
        />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
