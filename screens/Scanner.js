import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    alert(`Se ha escaneado el link: ${data}`);
    navigation.navigate('Home');
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de acceso a la cámara...</Text>;
  }
  
  if (hasPermission === false) {
    return <Text>Acceso a la cámara denegado.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? null : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

