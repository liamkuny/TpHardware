import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ContactScreen from './screens/Contacts';
import { Weather } from './screens/Weather';
function App() {
 
  return (
    <View style={styles.container}>
      <Button title="Obtener contactos" onPress={ContactScreen} />
      <Button title="Clima" onPress={Weather} />
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


