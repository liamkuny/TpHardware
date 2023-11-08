import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoScreen = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    AsyncStorage.getItem('lastVideoUrl').then((value) => {
      if (value) {
        setVideoUrl(value);
        video.current.loadAsync({ uri: value }, {}, false);
      }
    });
  }, []);

  const saveVideoUrl = () => {
    setVideoUrl(videoUrl); 
    AsyncStorage.setItem('lastVideoUrl', videoUrl);
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
        value={videoUrl}
        onChangeText={(text) => setVideoUrl(text)}
      />
      <Button title="Guardar" onPress={saveVideoUrl} />
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




