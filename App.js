import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ContactScreen from './screens/Contacts';
import Weather from './screens/Weather'; 
import Scanner from './screens/Scanner'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuestroProyecto from './screens/NuestroQr';
import VideoScreen from './screens/Video';

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
          component={Weather} 
          options={{
            headerTitle: 'Weather Screen',
          }}
        />
        <Stack.Screen
          name="ScannerScreen"
          component={Scanner}
          options={{
            headerTitle: 'QR Scanner',
          }}
        />
        <Stack.Screen
          name="NuestroProyecto"
          component={NuestroProyecto} 
          options={{
            headerTitle: 'Nuestro Proyecto',
          }}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen} 
          options={{
            headerTitle: 'Pantalla video',
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
      <Button
        title="Escaneo QR"
        onPress={() => navigation.navigate('ScannerScreen')}
      />
      <Button
        title="Escaneo NuestroQr"
        onPress={() => navigation.navigate('NuestroProyecto')}
      />
      <Button
        title="Ir a Screen Video"
        onPress={() => navigation.navigate('VideoScreen')}
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
