import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Video } from 'expo-av';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const VideoScreen = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('lastTextInputValue').then((value) => {
      if (value) {
        setTextInputValue(value);
      }
    });
  }, []);

  const playVideo = () => {
    setVideoUrl(textInputValue);
  };

  const saveTextInputValue = () => {
    // Guardar el último texto ingresado en el almacenamiento local
    AsyncStorage.setItem('lastTextInputValue', textInputValue);
  };

  return (
    <View>
      <TextInput
        placeholder="Ingresa el URL del video"
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
      />
      <Button title="Guardar" onPress={saveTextInputValue} />
      <Button title="Reproducir Video" onPress={playVideo} />

      {videoUrl && (
        <Video
          source={{ url: videoUrl }}
          style={{ width: 300, height: 200 }}
          useNativeControls
          shouldPlay
        />
      )}
    </View>
  );
};

export default VideoScreen;
