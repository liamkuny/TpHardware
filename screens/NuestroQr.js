import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NuestroProyecto = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestro proyecto Soifer y Kuniewsky</Text>
      <Image
        source={require('../assets/NuestroQR.jpeg')} 
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width:300,
    height:300, 
  },
});

export default NuestroProyecto;
