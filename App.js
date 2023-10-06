
import React from 'react';
import { View, Button } from 'react-native';
import { solicitarPermisos, obtenerContactos } from './screens/Contacts'; // Importa las funciones

function App() {
  async function manejarObtencionContactos() {
    await solicitarPermisos(); 
    await obtenerContactos(); 
  }

  return (
    <View>
      {}
      <Button title="Obtener contactos" onPress={manejarObtencionContactos} />
    </View>
  );
}

export default App;



