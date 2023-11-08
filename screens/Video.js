import React, { useState, useEffect } from 'react';
import { View, TextInput, Button} from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoScreen = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    AsyncStorage.getItem('lastTextInputValue').then((value) => {
      if (value) {
        setTextInputValue(value);
      }
    });
  }, []);

  const saveTextInputValue = () => {
    setVideoUrl(textInputValue);
    AsyncStorage.setItem('lastTextInputValue', textInputValue);
  };

  const PlayAndPause = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Ingresa el URL del video"
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
      />
      <Button title="Guardar" onPress={saveTextInputValue} />
      <Button title={status.isPlaying ? "Pause" : "Play"} onPress={PlayAndPause} />

      {videoUrl && (
        <Video
          source={{ uri: videoUrl }}
          ref={video}
          style={{
            width: 300,
            height: 200
          }}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      )}
    </View>
  );
};


export default VideoScreen;


