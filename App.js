// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/store';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MapScreen from './src/Screens/MapScreen';
import CommentsScreen from './src/Screens/CommentsScreen';
import TabNavigator from './src/Components/TabNavigator';
const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer independent={true}>
          <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                title: 'Registration',
                headerShown: false,
                headerTitleAlign: 'center',
              }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerShown: false,
                headerTitleAlign: 'center',
              }}
            />

            <MainStack.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: 'Карта',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                },
                headerTintColor: '#212121',
                headerTitleStyle: {
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 22,
                },
              }}
            />

            <MainStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                title: 'Коментарі',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                },
                headerTintColor: '#212121',
                headerTitleStyle: {
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 22,
                },
              }}
            />

            <MainStack.Screen
              name="Home"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
