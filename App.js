import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ContactScreen from './screens/Contacts';
import Weather from './screens/Weather'; // Importa el componente WeatherScreen
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{
            headerTitle: 'Contact Screen',
          }}
        />
        <Stack.Screen
          name="WeatherScreen"
          component={Weather} // Agrega WeatherScreen como un componente de pantalla
          options={{
            headerTitle: 'Weather Screen',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a Contact Screen"
        onPress={() => navigation.navigate('ContactScreen')}
      />
      <Button
        title="Ir a Weather Screen"
        onPress={() => navigation.navigate('WeatherScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
