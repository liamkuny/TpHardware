import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { solicitarPermisos, obtenerContactos } from './screens/Contacts';
import { Weather } from './screens/Weather'; 

function App() {
  async function manejarObtencionContactos() {
    await solicitarPermisos();
    await obtenerContactos();
    
  }
  async function ObtencionClima(){
    await Weather();
  }
  

  return (
    <View style={styles.container}>
      <Button title="Obtener contactos" onPress={manejarObtencionContactos} />
      <Button title="Clima" onPress={ObtencionClima} />
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


