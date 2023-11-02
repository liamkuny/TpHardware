import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking} from 'react-native'; 
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

  const handleBarCodeScanned = ({data }) => {
    setScanned(true);
    Linking.openURL(data); // Abre el enlace en el navegador si es una URL
  }

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to Camera</Text>;
  }

  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title='Tap to scan again' onPress={() => setScanned(false)} />}
    </View>
  );
};


