import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking, Image } from 'react-native'; // Agrega Image desde react-native
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar Code With Type ${type} and data ${data} has been scanned`);
    Linking.openURL(data); // Abre el enlace en el navegador si es una URL
  }

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('QR.jpeg')} // Reemplaza con la ruta de tu imagen
        style={{ width: 200, height: 200 }} // Ajusta el tamaño de la imagen según tus necesidades
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title='Tap to scan again' onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
