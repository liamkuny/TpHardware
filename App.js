import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ContactScreen from './screens/Contacts';
import Weather from './screens/Weather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App({ navigation }) {
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
          name="Weather"
          component={Weather}
          options={{
            headerTitle: 'Weather',
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
        title="Ir a Weather"
        onPress={() => navigation.navigate('Weather')}
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



